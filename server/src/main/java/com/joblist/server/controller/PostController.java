package com.joblist.server.controller;


import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import com.joblist.server.model.Post;
import com.joblist.server.services.PostExtraFunctions;
import com.joblist.server.services.PostRepository;
import com.joblist.server.services.PostServices;
import com.mongodb.client.gridfs.model.GridFSFile;

import org.springframework.web.bind.annotation.PutMapping;  

@RestController
@CrossOrigin
public class PostController {

    @Autowired
    PostRepository repo;

    @Autowired
    PostExtraFunctions erepo;

    @Autowired
    PostServices pServices;

     @GetMapping(value = "/getImage/{photoId}", produces = MediaType.IMAGE_JPEG_VALUE)
    public StreamingResponseBody getImage(@PathVariable String photoId) throws IOException {
        return pServices.getImage(photoId);
    }


    @GetMapping("/ViewPost")
    public List<Post> getAllPosts(){
        return repo.findAll();
    }

    @PostMapping("/AddPost")
    public Post addPost(
            @RequestPart("post") Post post,
            @RequestPart("photo") MultipartFile photo) throws Exception {
        return pServices.SaveDoc(post, photo);
    }
    
    @GetMapping("/postCount")
    public long countPost(){
        return repo.count();
    }

    @GetMapping("/posts/{text}")
    public List<Post> search(@PathVariable String text){
        return erepo.findByText(text);
    }

    @DeleteMapping("/posts/{text}")
    public void deleteByProfile(@PathVariable int text){
        // System.out.println(text);
        repo.deleteByNo(text);
    }
    
    @PutMapping("/updatePost/{no}")
    public void updatePost(@PathVariable int no, @RequestBody Post post) {
        erepo.updateByNo(no, post);
    }
}


