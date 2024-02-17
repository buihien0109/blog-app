package com.example.blogbackend.repository;

import com.example.blogbackend.entity.ViewHistory;
import com.example.blogbackend.model.dto.ViewMonthDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ViewHistoryRepository extends JpaRepository<ViewHistory, Integer> {
    @Query("SELECT new com.example.blogbackend.model.dto.ViewMonthDto(MONTH(vh.viewedAt), YEAR(vh.viewedAt), COUNT(vh)) " +
            "FROM ViewHistory vh " +
            "GROUP BY MONTH(vh.viewedAt), YEAR(vh.viewedAt) " +
            "ORDER BY YEAR(vh.viewedAt) ASC, MONTH(vh.viewedAt) ASC")
    List<ViewMonthDto> countViewsByMonth();
}