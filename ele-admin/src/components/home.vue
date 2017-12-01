<template>
    <content-header>
        <router-view/>
    </content-header>
</template>

<script>
import ContentHeader from "./nav-bar.vue"
export default {
    name: 'home',
    components:{
        ContentHeader
    }
}
</script>

