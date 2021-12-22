CREATE DATABASE IF NOT EXISTS t11915jr;

CREATE TABLE IF NOT EXISTS  `t11915jr`.`Party`(
    partyID       int auto_increment,
    dungeonMaster VARCHAR(45)  not null,
    numOfMembers  int default 0 null,
    partySize     int          null,
    sessionTime   VARCHAR(100) null,
    sessionDescription VARCHAR(255) null,
    constraint party_pk
        primary key (partyID)
);


CREATE TABLE IF NOT EXISTS  `t11915jr`.`members`(
    partyID int         not null,
    member  varchar(45) not null,
    primary key (partyID, member),
    constraint members_party_partyID_fk
        foreign key (partyID) references party (partyID)
            on update cascade on delete cascade
);
