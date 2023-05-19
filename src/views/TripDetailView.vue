<template>
    <div>
        <MainHeader2></MainHeader2>
        <TripDetailBody></TripDetailBody>
    </div>
</template>
<script>
import MainHeader2 from '../components/MainHeader2.vue' 
import TripDetailBody from '../components/TripDetailBody.vue' 
export default {
    components : {
        MainHeader2 : MainHeader2,
        TripDetailBody : TripDetailBody
    }
}
</script>