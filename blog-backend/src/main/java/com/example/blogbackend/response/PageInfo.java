package com.example.blogbackend.response;

import lombok.*;
import org.springframework.data.domain.Page;

import java.util.List;

public interface PageInfo<T> {
    List<T> getData();
    Integer getCurrentPage();
    Integer getPageSize();
    Integer getTotalPage();
    Integer getTotalElement();

    @RequiredArgsConstructor
    class PageInfoImpl<T> implements PageInfo{
        private final Page<T> page;

        @Override
        public List<T> getData() {
            return page.getContent();
        }

        @Override
        public Integer getCurrentPage() {
            return page.getSize();
        }

        @Override
        public Integer getPageSize() {
            return page.getNumber();
        }

        @Override
        public Integer getTotalPage() {
            return page.getTotalPages();
        }

        @Override
        public Integer getTotalElement() {
            return Math.toIntExact(page.getTotalElements());
        }
    }

    static PageInfo of(Page page) {
        return new PageInfoImpl(page);
    }
}
