USE farmacia_db;

/******TIPO******/
insert into tipos values (1,"aerosoles", 1 ,sysdate() , sysdate() );
insert into tipos values (2,"colirios", 1 ,sysdate() , sysdate());
insert into tipos values (3,"capsulas", 1 ,sysdate() , sysdate());
insert into tipos values (4,"polvo en suspension", 1 , sysdate() , sysdate());
insert into tipos values (5,"jarabes", 1 ,sysdate() , sysdate());
insert into tipos values (6,"cremas", 1 ,sysdate() , sysdate());


/******MEDICAMENTOS******/
insert into medicamentos values (1,"12345","amoxol", "amoxilina", 3 ,sysdate() , sysdate() );
insert into medicamentos values (2,"23456","dioxitlan", "amoxilina", 3 ,sysdate() , sysdate());

