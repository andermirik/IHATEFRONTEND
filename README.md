# Облачная разработка :+1:

## Лабароторная работа 1

###### Разработать веб-сервис на базе Spring MVC REST реализующий управление коллекцией объектов, и клиентское веб-приложение, предоставляющее интерфейс к разработанному веб-сервису. 
###### В коллекции необходимо хранить объекты класса HumanBeing, описание которого приведено ниже:

```java
public class HumanBeing {
    private Long id; //Поле не может быть null, Значение поля должно быть больше 0, Значение этого поля должно быть уникальным, Значение этого поля должно генерироваться автоматически
    private String name; //Поле не может быть null, Строка не может быть пустой
    private Coordinates coordinates; //Поле не может быть null
    private java.time.ZonedDateTime creationDate; //Поле не может быть null, Значение этого поля должно генерироваться автоматически
    private Boolean realHero; //Поле не может быть null
    private boolean hasToothpick;
    private float impactSpeed; //Максимальное значение поля: 759
    private WeaponType weaponType; //Поле не может быть null
    private Mood mood; //Поле не может быть null
    private Car car; //Поле может быть null
}
public class Coordinates {
    private long x;
    private double y;
}
public class Car {
    private String name; //Поле может быть null
}
public enum WeaponType {
    HAMMER,
    PISTOL,
    SHOTGUN,
    KNIFE;
}
public enum Mood {
    SORROW,
    LONGING,
    GLOOM,
    CALM,
    FRENZY;
}
```

###### Веб-сервис должен удовлетворять следующим требованиям:
- [x] API, реализуемый сервисом, должен соответствовать рекомендациям подхода REST.
требованиям:
- [x] Необходимо реализовать следующий базовый набор операций с объектами коллекции: добавление нового элемента, получение элемента по ИД, обновление элемента, удаление элемента, получение массива элементов.
требованиям:
- [x] Операция, выполняемая над объектом коллекции, должна определяться методом HTTP-запроса.
требованиям:
- [x]	Операция получения массива элементов должна поддерживать возможность сортировки и фильтрации по любой комбинации полей класса, а также возможность постраничного вывода результатов выборки с указанием размера и порядкового номера выводимой страницы.
требованиям:
- [x]	Все параметры, необходимые для выполнения операции, должны передаваться в URL запроса.
требованиям:
- [x]	Данные коллекции, которыми управляет веб-сервис, должны храниться в реляционной базе данных.
требованиям:
- [x]	Информация об объектах коллекции должна передаваться в формате json.
требованиям:
- [x]	В случае передачи сервису данных, нарушающих заданные на уровне класса ограничения целостности, сервис должен возвращать код ответа http, соответствующий произошедшей ошибке.
требованиям:
- [x] Веб-сервис должен быть "упакован" в веб-приложение, которое необходимо развернуть на сервере приложений Jetty.

###### Помимо базового набора, веб-сервис должен поддерживать следующие операции над объектами коллекции:
требованиям:
- [x]	Вернуть один (любой) объект, значение поля impactSpeed которого является максимальным.
требованиям:
- [x]	Вернуть количество объектов, значение поля impactSpeed которых больше заданного.
требованиям:
- [x]	Вернуть массив объектов, значение поля impactSpeed которых больше заданного.
###### Эти операции должны размещаться на отдельных URL.
###### Требования к клиентскому приложению:
требованиям:
- [x]	Клиентское приложение может быть написано на любом веб-фреймворке, который можно запустить на сервере.
требованиям:
- [x] Клиентское приложение должно обеспечить полный набор возможностей по управлению объектами коллекции, предоставляемых веб-сервисом -- включая сортировку, фильтрацию и постраничный вывод.
требованиям:
- [x] Клиентское приложение должно преобразовывать передаваемые сервисом данные в человеко-читаемый вид -- параграф текста, таблицу и т.д.
требованиям:
- [x] Клиентское приложение должно информировать пользователя об ошибках, возникающих на стороне сервиса, в частности, о том, что сервису были отправлены невалидные данные.
###### Веб-сервис и клиентское приложение должны быть развёрнуты на сервере.
###### Общие требования:
требованиям:
- [x] Упаковать веб-сервисы в Docker образ.
требованиям:
- [x] Для создания конфигурации образа использовать Dockerfile.


## Лабораторная работа №2

###### Переработать веб-сервис из лабораторной работы №1 таким образом, чтобы он реализовывали основные концепции микросервисной архитектуры. 
###### Для этого необходимо разделить на два сервиса -- "вызываемый" (из лабораторной работы #1) и "вызывающий" (новые сервис, который вызывает API существующего сервиса) перечисленные ниже изменения.
###### Новый сервис должен располагаться на URL /heroes и реализовывать следующие операции:
```java
-	/team/{team-id}/remove/hero-id : удалить героя из команды
-	/team/{team-id}/make-depressive : поменять всем героям команды настроение на максимально печальное
```

###### Изменения в "вызываемом" сервисе:
###### требования:
- [x] Сконфигурировать окружение для работы сервиса на платформе Spring Boot.
требованиям:
- [x] Запустить второй экземпляр сервиса на другом порту. Реализовать балансировку нагрузки между экземплярами с помощью Haproxy.
требованиям:
- [x] Реализовать механизм Service Discovery. Для этого установить Consul и интегрировать свой сервис с ним, автоматически регистрируя в момент запуска.

###### Требования к "вызывающему" сервису:
###### требования:
- [x] Обеспечив возможность его развёртывания на платформе Spring Cloud.
###### требования:
- [x] Использовать все основные компоненты архитектуры Spring Cloud: Config Service, Load Balancer, Service Discovery.
###### требования:
- [x] В качестве Service Discovery использовать Eureka.
###### требования:
- [x] В качестве балансировщика нагрузки использовать Ribbon.
###### требования:
- [x] Все запросы к сервисам должны проксироваться через API Gateway. В качестве API Gateway использовать Zuul Proxy.
###### требования:
- [x] У сервиса должно быть клиентcкое приложение на Vue.js. 

###### Общие требования:
###### требования:
- [x] Добавить автоматический деплой через Jenkins.
###### требования:
- [x] Убрать Dockerfile, вместо него использовать Gradle.
###### требования:
- [x] Jenkins упаковать в отдельный Docker образ.


###### Оба веб-сервиса и клиентское приложение должны сохранить полную совместимость с API, реализованным ранее.

![Это талисман](https://www.oracle.com/a/ocom/img/rc24-duke-java-mascot.jpg)

