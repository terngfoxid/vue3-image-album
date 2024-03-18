<template>
  <h1>Album Create</h1>
  <form @submit.prevent="postNewAlbum()">
    <div class="layout">
      <label>Name:</label>
      <input type="text" placeholder="Album Name" v-model="album.name" required>
    </div>
    <div class="layout">
      <label>Cover Photo:</label>
      <div>
        <input type="file" @change="onFileChanged($event)" accept="image/*" capture required />
        <p class="error">*only (JPEG, GIF and PNG)</p>
        <p class="error" v-if="(error != null) && (error != '')">{{ error }}</p>
      </div>
    </div>
    <div class="layout" v-if="imageUrl != null">
      <label></label>
      <img :src="imageUrl" style="width: 500px;">
    </div>
    <div class="layout">
      <label>Description:</label>
      <input type="text" placeholder="Description" v-model="album.description" required>
    </div>
    <div class="layout">
      <label></label>
      <button>Save</button>
      <router-link to="/album/" custom v-slot="{ navigate }">
        <button @click="navigate" role="link">
          Back
        </button>
      </router-link>
    </div>
  </form>
</template>

<script lang="ts">
import Album from '@/models/Album.model';
import { Options, Vue } from 'vue-class-component';
import AlbumService from '@/services/ALbum.service';

@Options({
  components: {

  },
})
export default class ALbumCreateView extends Vue {
  albumService: AlbumService = new AlbumService();

  album: Album = new Album();
  imageUrl: string | null = null;
  error: string | null = "";

  onFileChanged($event: Event) {
    this.error = '';
    const acceptedImageTypes = ['image/png', 'image/jpeg', 'image/gif']
    const target = $event.target as HTMLInputElement;
    if (target && target.files) {
      if (!acceptedImageTypes.includes(target.files[0].type)) {
        this.error = "ตรวจพบไฟล์ที่ไม่ใช่รูปภาพ";
        return;
      }
      this.album.cover_image = target.files[0];
    }
    if (this.album.cover_image != null) {
      this.imageUrl = URL.createObjectURL(this.album.cover_image)
    }
  }
  postNewAlbum() {
    if (this.error != "") {
      this.error = "โปรดแก้ไขไฟล์ให้ถูกต้อง"
      return;
    }
    this.albumService.post(this.album).then(response => response.json())
      .then(() => document.location.href = '/album')
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

.error {
  color: red;
}
</style>
