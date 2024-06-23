package com.joblist.server.model;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "JobPost")
public class Post {

    private String profile;
    private String desc;
    private int exp;
    private String techs[];

    @Indexed(unique = true)
    private int no;


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
