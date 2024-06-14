package com.springboot.model.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String author;
    private String coverType;
    private String publisher;
    private Date publicationDate;
    private int numberOfPages;
    private String language;
    private String genre;
<<<<<<< HEAD

=======
    
>>>>>>> origin
    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Product product;
<<<<<<< HEAD
}
=======
}
>>>>>>> origin
