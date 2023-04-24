<template>
    <div>
        <MainHeader></MainHeader>
        <TripDetailBody></TripDetailBody>
    </div>
</template>
<script>
import MainHeader from '../components/MainHeader.vue' 
import TripDetailBody from '../components/TripDetailBody.vue' 
export default {
    components : {
        MainHeader : MainHeader,
        TripDetailBody : TripDetailBody
    }
}
</script>