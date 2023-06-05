<template>
    <div>
        <MainHeader></MainHeader>
        <TripRecommendInputBody></TripRecommendInputBody>
    </div>
</template>
<script>
import MainHeader from '../components/MainHeader.vue';
import TripRecommendInputBody from '../components/TripRecommendInputBody.vue';
export default {
    components: {
        MainHeader : MainHeader,
        TripRecommendInputBody : TripRecommendInputBody
    }
}
</script>