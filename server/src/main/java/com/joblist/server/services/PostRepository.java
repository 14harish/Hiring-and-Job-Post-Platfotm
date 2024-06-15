package com.joblist.server.services;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.joblist.server.model.Post;

public interface PostRepository extends MongoRepository<Post,String>{

}
