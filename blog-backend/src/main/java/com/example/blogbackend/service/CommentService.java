package com.example.blogbackend.service;

import com.example.blogbackend.entity.Blog;
import com.example.blogbackend.entity.Comment;
import com.example.blogbackend.entity.User;
import com.example.blogbackend.exception.BadRequestException;
import com.example.blogbackend.exception.ResourceNotFoundException;
import com.example.blogbackend.model.request.UpsertCommentRequest;
import com.example.blogbackend.repository.BlogRepository;
import com.example.blogbackend.repository.CommentRepository;
import com.example.blogbackend.security.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final BlogRepository blogRepository;

    public List<Comment> getCommentsByBlogId(Integer blogId) {
        return commentRepository.findByBlog_IdOrderByCreatedAtDesc(blogId);
    }

    public Comment getCommentById(Integer id) {
        return commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy comment có id = " + id));
    }

    public Comment createComment(UpsertCommentRequest request) {
        User user = SecurityUtils.getCurrentUserLogin();

        Blog blog = blogRepository.findById(request.getBlogId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy blog có id = " + request.getBlogId()));

        Comment comment = Comment.builder()
                .content(request.getContent())
                .user(user)
                .blog(blog)
                .build();
        return commentRepository.save(comment);
    }

    public Comment updateComment(UpsertCommentRequest request, Integer id) {
        User user = SecurityUtils.getCurrentUserLogin();

        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy comment có id = " + id));

        Blog blog = blogRepository.findById(request.getBlogId())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy blog có id = " + request.getBlogId()));

        // Check comment có phải của user đó không
        if (!comment.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Không có quyền sửa comment này");
        }

        // Check comment có phải của blog đó không
        if (!comment.getBlog().getId().equals(blog.getId())) {
            throw new BadRequestException("Comment không thuộc blog này");
        }

        comment.setContent(request.getContent());
        return commentRepository.save(comment);
    }

    public void deleteComment(Integer id) {
        User user = SecurityUtils.getCurrentUserLogin();

        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy comment có id = " + id));

        // Check comment có phải của user đó không
        if (!comment.getUser().getId().equals(user.getId())) {
            throw new BadRequestException("Không có quyền xóa comment này");
        }

        commentRepository.deleteById(id);
    }

    public Comment updateCommentByAdmin(UpsertCommentRequest request, Integer id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy comment có id = " + id));

        if (blogRepository.findById(request.getBlogId()).isEmpty()) {
            throw new ResourceNotFoundException("Không tìm thấy blog có id = " + request.getBlogId());
        }

        // Check comment có phải của blog đó không
        if (!comment.getBlog().getId().equals(request.getBlogId())) {
            throw new BadRequestException("Comment không thuộc blog này");
        }

        comment.setContent(request.getContent());
        return commentRepository.save(comment);
    }

    public void deleteCommentByAdmin(Integer id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy comment có id = " + id));

        commentRepository.delete(comment);
    }
}


