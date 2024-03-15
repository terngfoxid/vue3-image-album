<template>
  <tr>
    <td style="text-align: center;">{{ index }}</td>
    <td>{{ album.name }}</td>
    <td>
      <img :src="album.url" style="width: 100px;">
    </td>
    <td>
      <div class="manage">
        <router-link :to="'/album/gallery/' + album.id" custom v-slot="{ navigate }">
          <button @click="navigate" role="link">
            Manage Gallery
          </button>
        </router-link>
        <router-link :to="'/album/edit/' + album.id" custom v-slot="{ navigate }">
          <button @click="navigate" role="link">
            Edit
          </button>
        </router-link>
        <button @click="deleteAlbum()">Delete</button>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import Album from '@/models/Album.model';
import { Options, Vue } from 'vue-class-component';
import AlbumService from '@/services/ALbum.service';

@Options({
  props: {
    album: Album,
    index: Number
  },

})
export default class AlbumRow extends Vue {
  albumService : AlbumService = new AlbumService();
  album!: Album
  index!: number

  deleteAlbum() {
    this.albumService.delete(this.album.id.toString()).then(response => response.json())
        .then(()=> document.location.href = '/album')
        .catch((err) => console.log(err));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td {
  padding-top: 5px;
  padding-bottom: 5px;

  .manage {
    padding-left: 5px;
    padding-right: 5px;
    display: flex;
    gap: 10px;
  }
}
</style>./AlbumRow.vue
