package com.joblist.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.joblist.server.model.Post;
import com.joblist.server.services.PostRepository;
import com.joblist.server.services.SearchRepository;;

@RestController
public class PostController {

    @Autowired
    PostRepository repo;

    @Autowired
    SearchRepository srepo;

    @GetMapping("/ViewPost")
    @CrossOrigin
    public List<Post> getAllPosts(){
        return repo.findAll();
    }
    @PostMapping("/AddPost")
    @CrossOrigin
    public Post addPost(@RequestBody Post post){
        System.out.println(post);
        return repo.save(post);
    }
    @GetMapping("/posts/{text}")
    @CrossOrigin
    public List<Post> search(@PathVariable String text)
    {
        return srepo.findByText(text);
    }

}
