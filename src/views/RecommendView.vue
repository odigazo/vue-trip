<template>
    <div>
        <MainHeader></MainHeader>
        <RecommendBody></RecommendBody>
    </div>
</template>
<script>
import MainHeader from '../components/MainHeader.vue';
import RecommendBody from '../components/RecommendBody.vue';
export default {
    components : {
        MainHeader : MainHeader,
        RecommendBody : RecommendBody
    },
}
</script>