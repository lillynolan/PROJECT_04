
**EVENTRY**

*Screenshots of Eventry*
![imageDescrip](https://i.imgur.com/UL7t8qL.png)
![imageDescrip](https://i.imgur.com/rMzXdSK.png)
![imageDescrip](https://i.imgur.com/K0t1owc.png)
![imageDescrip](https://i.imgur.com/epZPssQ.png)
![imageDescrip](https://i.imgur.com/xYyk8Lm.png)


**Explanations of the technologies used**<br>
**Frontend:** HTML, JSX, React <br>
My FrontEnd is built with React. I utilized HTML for the layout and JSX in order to insert javascript.<br>
<br>
**Backend:** Rails, PostgreSQL <br>
My backend is built in Rails with the database in Postgres.
. <br>
<br>
**TICKETMASTER API:** <br>
Information to my database pulls from the TicketMaster API. My application queries this database by city search and then posts it when the user clicks add event to my local database.
<br>


**General Approach**<br>

<br>In building Eventry, I wanted to capitalize on a trend prevailing with applications on the web today. In today's society, users are drawn to applications that allow them to share their activity and view respective friends activities and opinions. The idea of curating your own world within a application that reflects yourself and any the other users you have chosen to follow. This concept of bringing what you do publicly in the world to the web as a reflective, personal profile is what lead me to want to create Eventry. Eventry is an applicatoin that allows users to add public events occurring in cities around the world, create personal events and add them to a saved event list.<br> 

<br>Eventry uses Rails as its Backend and React as its Frontend. It is built integrating  Ticketmaster's API. A series of queries to Ticketmaster's API allow the user to fetch information on a chosen city and post "add" events into the local database. When the user searches a city 20, upcoming, popular events from the city result. This feature was important to me because whether you are traveling or at home in your local city, how you spend your free time is precious and many times a reflection of who you are. What events people either decide to "like" or attend, can be understood as a indication of their character. The user can view the city's resuls, choose to see more information on each individual event and then eventually add it to their Eventry if they deem fit. THe user can also create personal events and add them directly to their Eventry. This integration was important to me, so that users would have a feed of all their activity both personal and public events. One place to go to see their events both public and private.<br>

<br>Overall, I wanted the approach to be straightforward. I wanted users to be able to know what they were coming to use the application for. Many times websites start integrating a variety of features and a place you used to go for one thing now offers a series of functions. I wanted to create Eventry, the place to go to choose and see your events.<br>


**Installation instructions**<br>
Npm install all dependencies<br>
foreman start -p 3000 to start<br>
App requires an API key from Ticketmaster API<br>


**USERSTORIES:**<br><br>
**MY USER: An every day individual looking to search, create and organize their public and private events**

User logs in or registers on welcome entry page

*Welcome Page:*

User sees title of EVENTRY and has two options Login & Registrer 

*Registrar Page:*

User inputs First Name, Last Name, UserName and Password

Clicks register and is brought to the landing page

*Login Page:*

User inputs username and password 

Clicks login and is brought to the landing page

*Landing Page:*

User is brought to Eventry homepage

User inputs city of the desired location to see the upccoming events in the area

*Add Event/City Event Results*

User is brought to the AddEvent page where the events results of the searched city are listed

User can scroll through and click on each event to see more info

User also has two options on each event More Info or Add Event

User clicks More Info and is brough to SingleEvent

User clicks Add Event, the event is added to their Eventry and redirects to Profile

*Single Event View:*

User sees single event view with additional description of the specific event

Upcoming Event in X
Title 
Associate event image
Date
Location Descriptions

User has two options: Back to X city's results or Add Event 

User clicks back to X city's results and is shown the City Event Results

User clicks Add Event, event is added to their Eventry and redirects them to Profile

*User Eventry Profile:* 

User is brought to their user profile which showcases the events they have added

Events are displayed in ascending order by date 

User sees a short of each event with the name, date and description

Can click on any of them to bring back to Single Event View 


*Add Personal Event*

User clicks on Add Personal Event in Nav Bar

User fills out event information with corresponding detail

User clicks Add Event 

Event is added to their Eventry 


**WIREFRAMES:**


![imageDescrip](https://i.imgur.com/U1SBIv3.jpg?1)
![imageDescrip](https://i.imgur.com/JIvXdUk.jpg)
![imageDescrip](https://i.imgur.com/WhieIzq.jpg)


**Descriptions of unsolved problems//Hurdles**

Adding an event from the Create Personal Event page doesnt redirect to profile, it adds successfully<br><br>
Displaying time correctly was a big hurdle, in some instances I used Moment to display date and others I used toLocaleTimeString, the issue with toLocaleTimeString is that converts an events time to my current local time<br><br>
Input of time on the Create Event Page auto sets to 7:00pm, doesn't let you insert into localtime on event table<br><br>


