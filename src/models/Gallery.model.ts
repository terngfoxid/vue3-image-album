export default class Gallery{
    id = 0;
    albumId = 0;
    
    create_date: Date|null = null;
    update_date: Date|null = null;

    create_by: number|null = null;
    update_by: number|null = null;
    
    is_delete: boolean|null = false;

    url: string|undefined = "";
}