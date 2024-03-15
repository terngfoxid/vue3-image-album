<template>
  <div class="album">
    <h1>Album</h1>
    <div class="page">
      <div class="top-menu">
        <form @submit.prevent="search()">
          <div class="search-form">
            <input type="text" placeholder="Search by Album name" v-model="AlbumName">
            <button>Search</button>
          </div>
        </form>
        <router-link to="/album/create" custom v-slot="{ navigate }">
          <button @click="navigate" role="link">
            Create New Album
          </button>
        </router-link>
      </div>
      <table>
        <thead>
          <tr>
            <th style="width: 10%;">
              No
            </th>
            <th style="width: 30%;">
              Name
            </th>
            <th style="width: 20%;">
              Cover Photo
            </th>
            <th style="width: 40%;">
              Manage
            </th>
          </tr>
        </thead>
        <tbody>
          <AlbumRow v-for="(album, index) in Albums" :key="album.id" :album="album" :index="index + 1"></AlbumRow>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Album from '@/models/Album.model';
import { Options, Vue } from 'vue-class-component';
import AlbumRow from '@/components/AlbumRow.vue';
import AlbumService from '@/services/ALbum.service';

@Options({
  components: {
    AlbumRow,
  },
  created() {
    this.$watch(
      () => true,
      () => {
        this.init()
      },
      { immediate: true }
    )
  }
})
export default class ALbumView extends Vue {
  albumService : AlbumService = new AlbumService();

  Albums: Album[] = []

  AlbumName: string | null = "";
  init() {
    this.albumService.getAll()
      .then(response => response.json())
      .then(data => this.Albums = data.Object)
      .catch((err) => console.log(err));
    console.log(this.Albums)
  }
  search() {
    console.log("Searching "+this.AlbumName)
  }
}
</script>

<style>
.page {
  width: 90%;
  padding: 10px;
  margin: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

table,
td,
th {
  border: 2px solid #8d8d8d;

  th {
    padding-top: 5px;
    padding-bottom: 5px;
  }

}

.search-form {
  display: flex;
  /*justify-content: center;*/
  gap: 10px;
}

.top-menu {
  display: flex;
  justify-content: space-between;
}
</style>