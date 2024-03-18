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
      <div>
        <template v-if="Allpage != null">
        <template v-if="Name == ''">
          <router-link v-if="Page != '1'" :to="'/album/page/' + (parseInt(Page.toString()) - 1)">Back</router-link> |
          <router-link v-if="parseInt(Page.toString()) < parseInt(Allpage.toString())"
            :to="'/album/page/' + (parseInt(Page.toString()) + 1)">Next</router-link>
        </template>
        <template v-else>
          <router-link v-if="Page != '1'"
            :to="'/album/name/' + Name + '/page/' + (parseInt(Page.toString()) - 1)">Back</router-link> |
          <router-link v-if="parseInt(Page.toString()) < parseInt(Allpage.toString())"
            :to="'/album/name/' + Name + '/page/' + (parseInt(Page.toString()) + 1)">Next</router-link>
        </template>
      </template>
      </div>
      <div>
        <template v-if="Allpage != null">
        <template v-for="n in parseInt(Allpage.toString())" key="n">
          <template v-if="Name == ''">
            <router-link :to="'/album/page/' + n" :key="n">{{ n }}</router-link>

            <template v-if="n < parseInt(Allpage.toString())">
              |
            </template>
          </template>
          <template v-else>
            <router-link :to="'/album/name/' + Name + '/page/' + n" :key="n">{{ n }}</router-link>
            <template v-if="n < parseInt(Allpage.toString())">
              |
            </template>
          </template>
        </template>
      </template>
      </div>
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
      () => this.$route.params,
      () => {
        this.init()
      },
      { immediate: true }
    )
  }
})
export default class ALbumView extends Vue {
  albumService: AlbumService = new AlbumService();

  Albums: Album[] = []
  Name: string | string[] = "";
  Page: string | string[] = "";
  Allpage: number | null = 0;

  AlbumName: string | null = "";
  init() {
    this.Name = this.$route.params.name;
    if (this.Name == null) this.Name = "";
    this.Page = this.$route.params.page;
    if (this.Page == null) this.Page = "1";
    this.AlbumName = this.Name.toString()

    this.albumService.getAll(this.Name.toString(), this.Page.toString())
      .then(response => response.json())
      .then(data => {
        this.Albums = data.Object.album
        this.Allpage =  Math.ceil(data.Object.allAlbumCount / 10);
      })
      .catch((err) => console.log(err));
  }
  search() {
    if (this.AlbumName == null || this.AlbumName == "") location.replace("/album/page/1")
    else location.replace("/album/name/" + this.AlbumName + "/page/1")
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