package com.example.blogbackend.entity;

import com.example.blogbackend.dto.CategoryDto;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.Objects;

@NamedNativeQuery(
        name = "findCategoriesUsedOther",
        query = "SELECT c.id, c.name, count(c.id) as used from category c \n" +
                "left join blog_category bc\n" +
                "on c.id = bc.category_id \n" +
                "LEFT join blog b \n" +
                "on bc.blog_id = b.id\n" +
                "where b.status = true\n" +
                "GROUP by c.id",
        resultSetMapping = "categories"
)
@SqlResultSetMapping(
        name = "categories",
        classes = @ConstructorResult(
                targetClass = CategoryDto.class,
                columns = {
                        @ColumnResult(name = "id"),
                        @ColumnResult(name = "name"),
                        @ColumnResult(name = "used")
                }
        )
)
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "name")
    private String name;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Category category = (Category) o;
        return id != null && Objects.equals(id, category.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}