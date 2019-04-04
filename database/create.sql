CREATE TABLE `art`
  (
     id                 INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
     accession_number   VARCHAR(11),
     artist             VARCHAR(255),
     artistrole         VARCHAR(255),
     artistid           INT(11),
     title              VARCHAR(255),
     datetext           VARCHAR(11),
     medium             VARCHAR(255),
     creditline         VARCHAR(255),
     year               INT(11),
     acquisitionyear    INT(11),
     dimensions         VARCHAR(255),
     width              INT(11),
     height             INT(11),
     depth              INT(11),
     units              VARCHAR(255),
     inscription        VARCHAR(255),
     thumbnailcopyright VARCHAR(255),
     thumbnailurl       VARCHAR(255),
     url                VARCHAR(255)
  )


CREATE TABLE `comments`
  (
   id                 INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
   content            VARCHAR(255),
   name               VARCHAR(255),
   userID             INT(11)
   artID              INT(11)
  )

CREATE TABLE `users`
  (
     id             INT(11) UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
     name           VARCHAR(255),
     age            INT(11),
     location       VARCHAR(255)
  )
