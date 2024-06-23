package com.joblist.server.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.joblist.server.model.Post;
import com.joblist.server.services.PostExtraFunctions;
import com.joblist.server.services.PostRepository;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@CrossOrigin
public class PostController {

    @Autowired
    PostRepository repo;

    @Autowired
    PostExtraFunctions erepo;

    @GetMapping("/ViewPost")
    public List<Post> getAllPosts(){
        return repo.findAll();
    }

    @PostMapping("/AddPost")
    public Post addPost(@RequestBody Post post){
        return repo.save(post);
    }
    
    @GetMapping("/postCount")
    public long countPost(){
        return repo.count();
    }

    @GetMapping("/posts/{text}")
    public List<Post> search(@PathVariable String text)
    {
        return erepo.findByText(text);
    }

    @DeleteMapping("/posts/{text}")
    public void deleteByProfile(@PathVariable int text){
        System.out.println(text);
        repo.deleteByNo(text);
    }
    
    @PutMapping("/updatePost/{no}")
    public void updatePost(@PathVariable int no, @RequestBody Post post) {
        erepo.updateByNo(no, post);
    }
}


