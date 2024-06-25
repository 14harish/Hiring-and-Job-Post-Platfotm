package com.joblist.server.services;


import java.io.IOException;
import java.io.InputStream;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import com.joblist.server.model.Post;
import com.mongodb.client.gridfs.model.GridFSFile;

@Service

public class PostServices {
    @Autowired
    private GridFsTemplate gridFsTemplate;
    @Autowired
    PostRepository repo;
    public Post SaveDoc(Post post,MultipartFile photo) throws IOException{
        InputStream inputStream = photo.getInputStream();
        ObjectId fileId = gridFsTemplate.store(inputStream, photo.getOriginalFilename(), photo.getContentType());
        String PhotoId=fileId.toHexString();
        post.setPhoto(PhotoId);
        return repo.save(post);
        // System.out.println(id);
    }
    public StreamingResponseBody getImage(String photoId) throws IOException{
        ObjectId objectId = new ObjectId(photoId);
        GridFSFile gridFsFile = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(objectId)));
        if (gridFsFile != null) {
            GridFsResource resource = gridFsTemplate.getResource(gridFsFile);
            InputStream inputStream;
            try {
                inputStream = resource.getInputStream();
            } catch (IOException e) {
                throw new RuntimeException("Failed to read image", e);
            }
            return outputStream -> {
                IOUtils.copy(inputStream, outputStream);
            };
        }
        throw new RuntimeException("Image not found");
    }
    
}
