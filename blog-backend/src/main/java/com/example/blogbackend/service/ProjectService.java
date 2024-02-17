package com.example.blogbackend.service;

import com.example.blogbackend.entity.Project;
import com.example.blogbackend.exception.ResourceNotFoundException;
import com.example.blogbackend.model.request.UpsertProjectRequest;
import com.example.blogbackend.repository.ProjectRepository;
import com.example.blogbackend.utils.StringUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll(Sort.by("createdAt").descending());
    }

    public Project getProjectById(Integer id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy dự án với id " + id));
    }

    public Project createProject(UpsertProjectRequest request) {
        Project project = Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .thumbnail(request.getThumbnail() == null || request.getThumbnail().isEmpty()
                        ? StringUtils.generateLinkImage(request.getTitle())
                        : request.getThumbnail())
                .link(request.getLink())
                .source(request.getSource())
                .build();
        return projectRepository.save(project);
    }

    public Project updateProject(Integer id, UpsertProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy dự án với id " + id));
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setThumbnail(
                request.getThumbnail() == null || request.getThumbnail().isEmpty()
                        ? StringUtils.generateLinkImage(request.getTitle())
                        : request.getThumbnail());
        project.setLink(request.getLink());
        project.setSource(request.getSource());
        return projectRepository.save(project);
    }

    public void deleteProject(Integer id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy dự án với id " + id));
        projectRepository.delete(project);
    }
}
