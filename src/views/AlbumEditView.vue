<template>
  <h1>Album Edit</h1>
  <form @submit.prevent="putEditAlbum()">
    <div class="layout">
      <label>Name:</label>
      <input type="text" placeholder="Album Name" v-model="album.name" required>
    </div>
    <div class="layout">
      <label>Cover Photo:</label>
      <div>
        <input v-if="(cur_imageUrl == null) || (cur_imageUrl == '')" type="file" @change="onFileChanged($event)"
          accept="image/*" capture required />
        <input v-else type="file" @change="onFileChanged($event)" accept="image/*" capture />
        <p class="error">*only (JPEG, GIF and PNG)</p>
        <p class="error" v-if="(error != null) && (error != '')">{{ error }}</p>
      </div>
    </div>
    <div class="layout" v-if="imageUrl != null">
      <label>New Cover Photo:</label>
      <img :src="imageUrl" style="width: 200px;">
    </div>
    <div class="layout" v-if="cur_imageUrl != null&& cur_imageUrl != '' && imageUrl == null">
      <label>Current Cover Photo:</label>
      <div class="parent">
        <img :src="cur_imageUrl" style="width: 200px;">
        <button class="child remove" @click="deleteFile()">ลบ</button>
      </div>
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
  albumService: AlbumService = new AlbumService();

  album: Album = new Album();
  imageUrl: string | null = null;
  cur_imageUrl: string | undefined = undefined;

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

  init() {
    this.albumService.get(this.$route.params.id)
      .then(response => response.json())
      .then(data => {
        this.album = data.Object
        this.cur_imageUrl = this.album.url
      })
      .catch((err) => console.log(err));
  }

  putEditAlbum() {
    if (this.error != "") {
      this.error = "โปรดแก้ไขไฟล์ให้ถูกต้อง"
      return;
    }
    this.albumService.put(this.album).then(response => response.json())
      .then(() => document.location.href = '/album')
      .catch((err) => console.log(err));
  }

  deleteFile(){
    this.cur_imageUrl = '';
    this.error = "กรุณาอัพโหลดภาพ"
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

.parent {
  position: relative;
}

.child {
  position: absolute;
  top: 0;
  right: 0;
}

.remove {
  border-radius: 5px;
  padding: 3px;
  background-color: red;
  color: white;
}

.error {
  color: red;
}
</style>
