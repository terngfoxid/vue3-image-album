import Album from "@/models/Album.model";
import Gallery from "@/models/Gallery.model";

export default class AlbumService {
    private baseUrl = "http://192.168.1.44:8094";

    getAll(){
        return fetch(this.baseUrl+"/album/getAll")
    }

    get(id:string | string[]){
        return fetch(this.baseUrl+"/album/getById/"+id)
    }

    post(album: Album) {
        const body = new FormData();
        body.append("name", album.name)
        body.append("description", album.description)
        if (album.cover_image != null) {
            body.append("fileUploaded", album.cover_image);
        }

        return fetch(this.baseUrl+"/album/create", {
            method: "POST",
            body
        })
    }

    put(album: Album) {
        const body = new FormData();
        body.append("id", album.id.toString())
        body.append("name", album.name)
        body.append("description", album.description)
        if (album.cover_image != null) {
            body.append("fileUploaded", album.cover_image);
        }
        else{
            body.append("fileUploaded","");
        }

        return fetch(this.baseUrl+"/album/update", {
            method: "PUT",
            body
        })
    }

    delete(id:string | string[]){
        return fetch(this.baseUrl+"/album/delete/"+id,{
            method: "DELETE"
        })
    }

    //--------------------

    getGallery(id:string | string[]){
        return fetch(this.baseUrl+"/gallery/getAll/"+id)
    }

    putGallery(album:Album,galleries:Gallery[]){
        const body = new FormData();
        body.append("albumId", album.id.toString())
        body.append("galleries",JSON.stringify(galleries))
        if (album.gallery_image != null) {
            album.gallery_image.forEach((image,index) =>{
                body.append("fileUploaded", image);
            })
        }
        else{
            body.append("fileUploaded","");
        }
        return fetch(this.baseUrl+"/gallery/update",{
            method: "PUT",
            body
        })
    }
}