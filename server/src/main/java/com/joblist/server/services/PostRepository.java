package com.joblist.server.services;





import org.springframework.data.mongodb.repository.MongoRepository;


// import com.joblist.server.controller.User;
import com.joblist.server.model.Post;

public interface PostRepository extends MongoRepository<Post,String>{
    long deleteByNo(int no);
    Post findByNo(int no);
    // Post saveOrUpdate(Post post);  // You can name it as per your preference
    

    
}
