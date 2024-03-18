<template>
  <h1>Manage Gallery</h1>
  <div class="layout">
    <label>Name:</label>
    {{ album.name }}
  </div>
  <div class="layout">
    <label>Cover Photo:</label>
    <img :src="album.url" style="width: 100px;">
  </div>
  <div class="layout">
    <label>Description:</label>
    {{ album.description }}
  </div>
  <div class="layout">
    <label>Gallery:</label>
    <input id="fileInput" type="file" multiple @change="onFileChanged($event)" accept="image/*" capture />
  </div>
  <div class="layout" v-if="(imageUrl != null && imageUrl.length > 0) || (galleries != null && galleries.length > 0)">
    <label></label>
    <div class="grid">
      <template v-for="(gallery, index) in galleries">
        <div class="parent" v-if="gallery.is_delete != true" :key="gallery.id">
          <img :src="gallery.url" style="width: 100%;">
          <button class="child remove" @click="removeOldImage(index)">ลบ</button>
        </div>
      </template>
      <div class="parent" v-for="(image, index) in imageUrl" :key="image">
        <img :src="image" style="width: 100%;">
        <p class="childNew">New</p>
        <button class="child remove" @click="removeNewImage(index)">ลบ</button>
      </div>
    </div>
  </div>
  <div class="layout">
    <label></label>
    <button @click="save()">Save</button>
    <router-link to="/album/" custom v-slot="{ navigate }">
      <button @click="navigate" role="link">
        Back
      </button>
    </router-link>
  </div>
</template>

<script lang="ts">
import Album from '@/models/Album.model';
import Gallery from '@/models/Gallery.model';
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
export default class GalleryManageView extends Vue {
  albumService: AlbumService = new AlbumService();
  album: Album = new Album();
  galleries: Gallery[] = [];
  imageUrl: string[] | null = [];

  onFileChanged($event: Event) {
    const target = $event.target as HTMLInputElement;
    this.album.gallery_image = [];
    this.imageUrl = [];
    if (target && target.files) {
      for (let i = 0; i < target.files.length; i++) {
        this.album.gallery_image?.push(target.files[i])
      }
    }
    const body = new FormData();
    if (this.album.gallery_image != null) {
      this.album.gallery_image.forEach(
        (image) => {
          this.imageUrl?.push(URL.createObjectURL(image))
        }
      )
    }
  }

  init() {
    this.albumService.getGallery(this.$route.params.id)
      .then(response => response.json())
      .then(data => {
        this.album = data.Object.album
        this.galleries = data.Object.galleries
        console.log(this.galleries);
      })
      .catch((err) => console.log(err));
  }

  removeNewImage(index: number) {
    this.album.gallery_image?.splice(index, 1)
    this.imageUrl?.splice(index, 1)
  }

  save() {
    this.albumService.putGallery(this.album, this.galleries)
      .then(response => response.json())
      .then(data => location.reload())
      .catch((err) => console.log(err));
  }

  removeOldImage(index: number) {
    this.galleries[index].is_delete = true;
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

.grid {
  width: 70%;
  display: grid;
  grid-template-columns: 25% 25% 25% 25%;
}

.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 0;
  right: 0;
}

.childNew {
  position: absolute;
  top: 0;
  left: 5px;
  background-color: black;
  border-radius: 5px;
  padding: 3px;
  margin: 0px;
  color: white;
}

.remove {
  border-radius: 5px;
  padding: 3px;
  background-color: red;
  color: white;
}
</style>
