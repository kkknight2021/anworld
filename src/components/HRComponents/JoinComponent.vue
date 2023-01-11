<template>
  <div>
    <h3>如果您要与我们进行相关合作，您可以通过以下方式联系我们：</h3>
    <div v-for="item in items" :key="item.index">
      <p>联系人：{{item.name}}</p>
      <p>电话：{{item.telephone}}</p>
      <p>Email：{{item.email}}</p>
    </div>
    <span>地址：{{address}}</span>
  </div>
</template>

<script>
export default {
  name: 'Join',
  data() {
    return {
      items: [
        {name:"傅总", telephone:'13824676941', email:'2964725233@qq.com'},
      ],
      address: '广东省广州市天河区富力大夏x栋x号'
    }
  },
}
</script>

