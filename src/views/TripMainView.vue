<template>
    <div>
<MainHeader></MainHeader>
<TripMainBody></TripMainBody>
    </div>
</template>
<script>
import MainHeader from '../components/MainHeader.vue' 
import TripMainBody from '../components/TripMainBody.vue' 
// import MyPageCourseBody from '../components/MyPageCourseBody.vue' 
export default {
    components : {
        MainHeader : MainHeader,
        TripMainBody : TripMainBody,
        // MyPageCourseBody : MyPageCourseBody
    },
    methods: {

    }
}
</script>
