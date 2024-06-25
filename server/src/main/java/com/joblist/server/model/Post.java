package com.joblist.server.model;
import org.bson.types.Binary;
// import org.bson.types.Binary;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
// import org.springframework.web.multipart.MultipartFile;


@Document(collection = "JobPost3")
public class Post {

    @Indexed(unique = true)
    private int no;
    private String profile;
    private String desc;
    private int exp;
    private String techs[];

    private String photo;  
    public String getPhoto() {
        return this.photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

  

    // public String getPhoto() {
    //     return this.photo;
    // }

    // public void setPhoto(String photo) {
    //     this.photo = photo;
    // }
    // private MultipartFile photo;

 
    // public MultipartFile getPhoto() {
    //     return this.photo;
    // }

    // public void setPhoto(MultipartFile photo) {
    //     this.photo = photo;
    // }

   
    // public String getPhoto() {
    //     return this.photo;
    // }

    // public void setPhoto(String photo) {
    //     this.photo = photo;
    // }



  public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

   


    public String getProfile() {
        return this.profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getDesc() {
        return this.desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public int getExp() {
        return this.exp;
    }

    public void setExp(int exp) {
        this.exp = exp;
    }

    public String[] getTechs() {
        return this.techs;
    }

    public void setTechs(String techs[]) {
        this.techs = techs;
    }
}
