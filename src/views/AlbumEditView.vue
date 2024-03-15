<template>
  <h1>Album Edit</h1>
  <form @submit.prevent="putEditAlbum()">
    <div class="layout">
      <label>Name:</label>
      <input type="text" placeholder="Album Name" v-model="album.name" required>
    </div>
    <div class="layout">
      <label>Cover Photo:</label>
      <input type="file" @change="onFileChanged($event)" accept="image/*" capture/>
    </div>
    <div class="layout" v-if="imageUrl != null">
      <label>New Cover Photo:</label>
      <img :src="imageUrl" style="width: 200px;">
    </div>
    <div class="layout" v-if="cur_imageUrl != null && imageUrl == null">
      <label>Current Cover Photo:</label>
      <img :src="cur_imageUrl" style="width: 200px;">
    </div>
    <div class="layout">
      <label>Description:</label>
      <input type="text" placeholder="Description" v-model="album.description" required>
    </div>
    <div class="layout">
      <label></label>
      <button>Save</button>
    </div>
  </form>
  <div class="layout">
    <label></label>
    <router-link to="/album/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">
        Back
      </button>
    </router-link>
  </div>
</template>

<script lang="ts">
import Album from '@/models/Album.model';
import AlbumService from '@/services/ALbum.service';
import { Options, Vue } from 'vue-class-component';

@Options({
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.init()
      },
      { immediate: true }
    )
  }
})
export default class ALbumEditView extends Vue {
  albumService : AlbumService = new AlbumService();

  album: Album = new Album();
  imageUrl: string | null = null;
  cur_imageUrl: string | undefined = undefined;

  onFileChanged($event: Event) {
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
      this.album.cover_image = target.files[0];
    }
    if (this.album.cover_image != null) {
      this.imageUrl = URL.createObjectURL(this.album.cover_image)
    }
  }

  init(){
    this.albumService.get(this.$route.params.id)
      .then(response => response.json())
      .then(data => {
        this.album = data.Object
        this.cur_imageUrl = this.album.url
      })
      .catch((err) => console.log(err));
  }

  putEditAlbum(){
    this.albumService.put(this.album).then(response => response.json())
        .then(()=> document.location.href = '/album')
        .catch((err) => console.log(err));
  }
}
</script>

<style>
.layout {
  display: flex;
  margin-bottom: 20px;
  gap: 20px;
}

label {
  width: 20%;
  text-align: end;
}
</style>
