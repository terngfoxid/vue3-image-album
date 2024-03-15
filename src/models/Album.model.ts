export default class Album{
    id = 0;
    name = "";
    description = "";
    
    create_date: Date|null = null;
    update_date: Date|null = null;

    create_by: number|null = null;
    update_by: number|null = null;
    
    is_delete: boolean|null = false;

    url: string|undefined = "";

    //Front End only
    cover_image: File | null = null;
    gallery_image: File[] | null = null;
    //Images : Image[]|null = [];
}