<template>
    <div>
    여행 출발일 : <input type="date" id="startDate"><br>
    여행 종료일 : <input type="date" id="endDate"><br>    
    
    주요목적 : 
    <select id="purpose">
    <option value="">목적선택</option>
    <option value="자연 속 여행">자연 속 여행</option>
    <option value="가족 여행">가족 여행</option>
    <option value="역사와 문화 여행">역사와 문화 여행</option>
    <option value="축제와 이벤트 여행">축제와 이벤트 여행</option>
</select><br>    
    거리 : <select id="distance">
            <option value="상관없음">상관없음</option>
            <option value="가까운 곳">가까운 곳</option>
        </select><br>
        <button @click="recommend()">여행지 추천</button> 
    </div>    
</template>
<script>
export default {
    methods : {
        recommend() {
            let startDate = document.getElementById('startDate');
            let endDate = document.getElementById('endDate');
            let purpose = document.getElementById('purpose');
            let distance = document.getElementById('distance');

            let userInfo = this.$store.getters.getUserInfo;

            if (this.checkEmpty(startDate.value) && this.checkEmpty(endDate.value) && this.checkEmpty(purpose.value) && this.checkEmpty(distance.value)) {
                this.$axios({
                    url : 'http://dapi.kakao.com/v2/local/search/address.json',
                    method : 'GET',
                    headers : {
                        'Authorization' : 'KakaoAK 28129ad995eebba2852f3ad70480cfaa',
                        'content-type' : 'application/json'
                    },
                    params : {
                        query : '인천광역시 미추홀구 경원대로 887번길 24-25' //사용자의 주소
                    },
                    withCredentials: false,
                    responseType : 'json'
                }).then(function(result) {
                    let longitude = result.data.documents[0].road_address.x;
                    let latitude = result.data.documents[0].road_address.y;
                    this.$axios({
                        url: 'http://localhost:8080/trip/mainPage/recommendInput',
                        method: 'GET',
                        params: {
                            startDate : startDate.value,
                            endDate : endDate.value,
                            purpose : purpose.value,
                            distance : distance.value,
                            longitude : longitude,
                            latitude : latitude,
                            userInfo : userInfo.userNum
                        },
                        responseType: 'json'
                    }).then(function(detail) {
                        let placeDetail = detail.data;
                        this.$axios({
                            url: 'https://dapi.kakao.com/v2/local/search/keyword.json',
                            method: 'GET',
                            params: {
                                query : placeDetail.placeName
                            },
                            headers: {Authorization: 'KakaoAK 28129ad995eebba2852f3ad70480cfaa'},
                            withCredentials: false,
                            responseType: 'json'
                        }).then(function(result) {
    
                            if (result.data.documents.length != 0) {
                                placeDetail.placeUrl = result.data.documents[0].place_url;
                            }
                            this.$store.commit("setTripDetail", placeDetail);
                            this.$router.push({name:"tripDetail"});
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            } else {
                alert('입력란을 모두 작성해주세요!');
            }


        },
        checkEmpty(input) {
            if (input == '') {
                console.log(input);
                return false;
            }else {
                return true;
            }
        }
    }
}
</script>
