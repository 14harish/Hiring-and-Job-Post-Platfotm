package com.joblist.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import com.joblist.server.model.Post;
import com.joblist.server.services.PostRepository;;

@RestController
public class PostController {

    @Autowired
    PostRepository repo;

    @GetMapping("/ViewPost")
    public List<Post> getAllPosts(){
        return repo.findAll();
    }
    @PostMapping("/AddPost")
    @CrossOrigin
    public Post addPost(@ResquestBody Post post){
        System.out.println(post);
        return repo.save(post);
    }

}
