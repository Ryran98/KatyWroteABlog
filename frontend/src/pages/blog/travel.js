import React from 'react';
import { Container } from 'reactstrap';
import { Blog } from '../../components/blog';
import { Footer } from '../../components/footer';
import LondonTravelImage from '../../images/LondonTravelImage.jpg';

export class TravelBlogPage extends React.Component {
    render() {
        return (
            <div>
                <Container fluid>
                    <Blog
                        title="Summer mini-break in London"
                        image={LondonTravelImage}
                        content="Myself and my partner, Tom, just got back from spending four days in bustling London during the recent heat wave and this is what we got up to. 

                    We arrived into Paddington station around midday on the Thursday and dropped our bags off at our accommodation. We were kindly gifted a stay at Hostel One Notting Hill which is in walking distance of Paddington station as well as Hyde Park and three tube stations. We had a quick tour around the hostel and dropped our bags off in our room before catching the tube to our only planned activity - watching Life of Pi at Wyndhams Theatre. 
                    
                    We chose to book a matinee performance for two main reasons, to stay out of the heat during the hottest part of the day and to keep our evening free. Neither of us had been to the theatre for many years so it was so nice to be back. We bought our tickets relatively last minute through the company From The Box Office and were satisfied with their service. 
                    
                    Wyndhams Theatre is very close to Lecister Square so afterwards we took a leisurely stroll over there and into China Town where we enjoyed people watching and looking at all the shops, cafes and restaurants. 
                    
                    Every night at Hostel One Noting Hill guests are invited to join in with their “family dinner” so on Thursday night we did just that. It is always a vegetarian meal cooked by one of the staff members and it is free to enjoy but a donation is encouraged. Afterwards we joined in with playing some games and having a drink before heading back into the centre where a big group of us went to O’Neils for a little bit of a boogie to some live music. 
                    
                    Friday morning started slow with a lie-in before catching the tube to Camden Market and getting some street food for lunch. Tom opted for a Bahn Mi and I went for vegan Columbian style food from Maize Blaze which included fried plantain, crispy potatoes, perfect guacamole, rice, salad and pickled red cabbage. It was my second time eating from there and I would definitely go back again! 
                    
                    After lunch we headed over to the Natural History Museum, unfortunately we got there only an hour or so before close so it gave us just enough time to explore the dinosaur exhibit, see Dippy “the Nations favourite dinosaur” and check out the minerals section and the vault where Tom was very impressed at seeing a meteor from Mars. 
                    We then headed back to China Town to go for dinner at a restaurant we had eyed up the night before. The Eight London is a Hongkong style restaurant that opened early July 2022 and when we first walked by there was queue of people outside waiting to get a table which is often a sign of a good place. On Friday night there was another queue to get in which we happily joined, we waited for around 30 minutes in total but it was certainly worth the wait! The whole experience was great and the food was delicious! I’m a pescatarian and although the menu was mainly meat based there was enough options for me to enjoy a tasty selection of different dishes. We opted for the vegetable spring rolls, prawn toast, salt and pepper tofu , crispy seaweed and noodles with mixed vegetables and it was more than enough food for the both of us. Everything was superb but my favourite two dishes were the prawn toast and tofu. The total bill came to just under £43 which we thought was a fair price for a total of 5 dishes. We then ended the night with a drink at a pub in busy Covent Garden before getting the tube back to the hostel.
                    
                    Saturday morning I was super excited as we had planned to meet my brother, his wife and my baby nephew. They live in East London so we hopped on the central line to go and meet them in Hackney Wick where we grabbed an iced coffee and toasted sandwich which we took to the Olympic Park and took shelter from the sun under one of the trees. After a few hours my brother suggested getting gelato so we went to La Gelateria which is known as “London’s finest artisan gelato” and I have to admit it was very good. Tom and myself shared a medium tub where you can try up to 3 different flavours for a total of £5.20 we went with vegan strawberry, vegan dark chocolate and peanut butter, chocolate and caramel all of which were delicious but both of us agreed the peanut butter flavour was our favourite. 
                    
                    After saying goodbye to my family we took a walk along the canal from Hackney Wick to Mile End where there was a free canal festival on. Sadly we weren’t really feeling the festival but we enjoyed the walk there looking at all the different canal boats. We then got back on the tube and headed over to Shoreditch and Brick Lane where we spent the rest of the afternoon browsing the various different markets there. We were lucky enough to walk past Café 1001 just as an all women samba band started playing who were joined by a dancer dressed in a carnival costume so we enjoyed watching that before heading to Beigel Bake. 
                    
                    My brother introduced me to Beigel Bake several years ago and since then I’ve been hooked. If, like Tom, you’ve never been before Beigel Bake is a bagel shop that’s open 24/7 and it serves the softest, tastiest fresh bagels with a variety of different fillings I went for avocado and smoked salmon which cost £4 and Tom went for the traditional salt beef with mustard and gherkin. We spent the rest of the night catching up with a friend over drinks. 
                    
                    Sunday morning was time for us to check out of Hostel One Notting Hill and head back to Reading where Rex, our van and home, was waiting for us."
                    />
                </Container>
                <Footer />
            </div>
        );
    }
}