import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/sidebar/SideBar";
import Indicators from "./components/Indicators/Indicators";
import Tabs from "./components/tabs/Tabjs";
import EmailViewer from "./components/emailViewer/EmailViewer";
import WeatherClockLocation from "./components/weatherClockLocation/weatherClockLocation";
import EmailListSocial from "./components/emailListSocial/EmailListSocial";
import EmailListPromotions from "./components/emailListPromotions/EmailListPromotions";
import EmailListStarred from "./components/emailList/EmailListStarred";
import EmailListUsados from "./components/emailList/EmailListUsados";
import PopupWindow95 from "./components/popUpWindow95/PopUpWindows95";
import "./styles.css";
import Click from "./Sound/Click.wav";
import NewMail from "./Sound/NewMail.wav"; 
import Error from "./Sound/Error.wav"; 
import Important from "./Sound/Important.wav"; 
import MusicPlayer from "./components/musicPlayer/MusicPlayer"; 
import Broken from "./images/broken.png";

import Button from "./components/StyledButton";
import Options from "./components/options/Options";
import StartMenu from "./components/startMenu/StartMenu";


const SPECTRUM_COLORS = [
  "#000000", 
  "#0000AA", 
  "#00AA00", 
  "#00AAAA", 
  "#AA0000", 
  "#AA00AA", 
  "#AA5500", 
  "#AAAAAA", 
  "#555555", 
  "#5555FF", 
  "#55FF55", 
  "#55FFFF", 
  "#FF5555", 
  "#FF55FF", 
  "#FFFF55", 
  "#FFFFFF", 
];

const COLOR_VARIABLES = [
  "--color-bg-body",
  "--color-text",
  "--color-border-strong",
  "--color-shadow-win95",
  "--color-shadow-inset",
  "--color-bg-header",
  "--color-bg-outset",
  "--color-bg-hover",
  "--color-bg-active",
  "--color-bg-special-blue",
  "--color-bg-approve",
  "--color-bg-reject",
];


function startSpectrumHackEffect(duration = 5000, intervalTime = 300) {
  const rootStyle = getComputedStyle(document.documentElement);
  const originalValues = {};
  COLOR_VARIABLES.forEach((variable) => {
    originalValues[variable] = rootStyle.getPropertyValue(variable);
  });
  const intervalId = setInterval(() => {
    COLOR_VARIABLES.forEach((variable) => {
      const randomColor = SPECTRUM_COLORS[Math.floor(Math.random() * SPECTRUM_COLORS.length)];
      document.documentElement.style.setProperty(variable, randomColor);
    });
  }, intervalTime);
  setTimeout(() => {
    clearInterval(intervalId);
    COLOR_VARIABLES.forEach((variable) => {
      document.documentElement.style.setProperty(variable, originalValues[variable]);
    });
  }, duration);
}

const storylineAccesoGlobal = [
  {
    id: "1.1",
    subject: "Control over global distribution",
    content: `The unrestricted use of this groundbreaking technology has sparked significant inequalities and rising tensions across the globe. Larger nations are rapidly capitalizing on its potential, leaving smaller countries struggling to compete. 
    
    Critics warn that without centralized oversight, the technology could create a world divided by stark disparities in access and development. Proponents of freedom argue that restricting access stifles innovation and undermines equality, but others caution that unchecked use risks chaos.
    
    As a global leader in information and influence, our editorial stance could shape the narrative moving forward. Will we advocate for centralized control to ensure fair distribution, push for complete freedom, or propose a balanced, cooperative solution? Every decision carries weight, and the world is watching.`,
    snippet: "Centralized control, open freedom, or a cooperative balance?",
    options: [
      {
        label: "A) Centralize",
        cred: 0,
        econ: -10,
        polar: -15,
        nextStep: "1.2",
        socialEmails: [
          {
            subject: "Allied Nations Centralize Distribution",
            snippet: "Rising tensions between countries threaten alliances.",
            content: "As a direct response to our recent decisions, our allied countries have initiated heated debates questioning the authenticity of our alliance. Are we truly partners, or are we exploiting their trust for personal gain? This situation is escalating, and if we don't act cautiously, it could culminate in shattered alliances and diplomatic fallout. The stakes have never been higher."
          }
        ],
        promoEmails: [
          {
            subject: "Exclusive Discounts for Our Citizens!",
            snippet: "Revolutionary discoveries, but only for a few.",
            content: "Prepare to revolutionize your efficiency with our cutting-edge technology, now available at unbeatable prices—exclusively for citizens of our nation. For customers outside our borders, due to restrictive policies, we regretfully cannot ship to other countries. These policies highlight the growing divide between progress and exclusion, leaving others wondering if they will ever have access to these breakthroughs."
          }
        ]
        
      },
      {
        label: "B) Total freedom",
        cred: +10,
        econ: -15,
        polar: +20,
        nextStep: "1.2",
        socialEmails: [
          {
            subject: "Freedom Policy Sparks Divided Reactions",
            snippet: "Celebration and concern over open access.",
            content: "The decision to allow unrestricted access has ignited a wave of celebration among advocates of equality, who see this as a historic step toward a more inclusive future. However, global leaders warn of the unintended consequences: smaller nations fear being overshadowed by larger powers, and some experts predict a surge in unauthorized uses of the technology. This pivotal moment has brought both hope and uncertainty to the international stage."
          }
        ],
        promoEmails: [
          {
            subject: "Access Without Borders – New Offers Await!",
            snippet: "Promotions for open-access technology worldwide.",
            content: "Take advantage of groundbreaking promotions that reflect our commitment to unrestricted access. Our open-access platforms are now available at unprecedented discounts, empowering you to join the forefront of this technological revolution. However, due to supply constraints and high demand, priority is given to select regions, sparking concerns about fairness in distribution. Act quickly to secure your share before supplies run out."
          }
        ]
        ,
      },
      {
        label: "C) International committee",
        cred: +10,
        econ: -10,
        polar: -20,
        nextStep: "1.2",
        socialEmails: [
          {
            subject: "International Collaboration Announced",
            snippet: "Countries agree on global policies.",
            content: `The decision to establish an international committee marks a significant milestone in global cooperation. Nations across the world have agreed to work together in drafting unified policies for the equitable use of this revolutionary technology.
        
        This initiative aims to foster a sense of shared responsibility, ensuring that no single nation monopolizes resources or benefits disproportionately. Smaller countries see this as a rare opportunity to have their voices heard in a global forum, while larger powers cautiously welcome the balance it could bring to international relations.
        
        However, critics argue that the bureaucracy involved may slow down progress and lead to compromises that dilute the potential of the technology. While the formation of this committee is being celebrated as a step toward unity, its success will ultimately depend on whether nations can truly set aside their differences to work for the common good.`,
          },
        ],
        promoEmails: [
          {
            subject: "Collaboration Promotions",
            snippet: "Offers for collaborative technology.",
            content: `In celebration of the newly established international committee, we are excited to announce exclusive promotions designed to support collaborative efforts in technology development. These special deals are aimed at facilitating cross-border partnerships and ensuring that all nations can access the tools they need to contribute to this global initiative.
        
        The promotions include discounted licenses for collaborative platforms, shared research tools, and priority access to infrastructure designed to enhance international cooperation. By making these resources more accessible, we hope to foster a spirit of unity and innovation among participating nations.
        
        While these offers highlight the potential for collective growth, some regions have expressed concerns about the affordability and equitable distribution of these resources. As we move forward, we remain committed to finding solutions that uphold the values of fairness and progress for all.`,
          },
        ],
        
      },
    ],
  },
  {
    id: "1.2",
    subject: "Ethical use of technology",
    content: `Reports indicate that the technology is now being adapted for advanced weaponry, raising alarms across the globe. Critics argue that its militarization could destabilize international peace and escalate conflicts, while advocates for freedom claim that restrictions may hinder innovation and self-defense.
    
    Our editorial stance on this issue will have far-reaching implications. Should we condemn and call for a prohibition of its use in weaponry, support unrestricted access in the name of progress, or propose a middle ground by allowing selective licensing? Each path carries its own ethical, economic, and geopolitical consequences. The stakes couldn’t be higher.`,
    snippet: "Prohibit weaponization, allow full freedom, or license selectively?",
    options: [
      {
        label: "A) Prohibit weaponry use",
        cred: +15,
        econ: -10,
        polar: +20,
        nextStep: "1.3",
        socialEmails: [
          {
            subject: "Criticism of Naïve Idealism",
            snippet: "Experts warn of potential risks.",
            content: `Our decision to prohibit weaponization has sparked mixed reactions. While humanitarian groups praise the ethical stance, military and security experts have criticized it as naïve and dangerous. 
    
    Critics argue that this prohibition leaves our allies vulnerable to nations that may ignore these restrictions, potentially destabilizing the global balance of power. As concerns mount, we must question whether our principles can withstand the harsh realities of international politics.`,
          },
        ],
        promoEmails: [
          {
            subject: "Ethics Over Profit",
            snippet: "Join the movement for responsible innovation.",
            content: `In line with our stance on ethical applications, our partners are offering special discounts on technologies aimed at humanitarian and peaceful uses. 
    
    While this decision may reduce immediate profits, it paves the way for a more sustainable and equitable future. Explore the new wave of innovation driven by responsibility, not conflict.`,
          },
        ],
      },
      {
        label: "B) Allow freedom",
        cred: -15,
        econ: +20,
        polar: 0,
        nextStep: "1.3",
        socialEmails: [
          {
            subject: "Global Outrage Over Weaponization",
            snippet: "Massive backlash from world leaders.",
            content: `Our decision to allow unrestricted weaponization has drawn widespread condemnation from global leaders and humanitarian organizations. Critics accuse us of prioritizing economic gain over human lives, with some countries threatening to sever diplomatic ties. 
    
    Reports of smaller nations being coerced or overshadowed by military superpowers using this technology are flooding in. This decision could lead to unprecedented global instability, and we must face the consequences of our actions.`,
          },
        ],
        promoEmails: [
          {
            subject: "Weapon Technology Now Available",
            snippet: "Unleash the power, no restrictions.",
            content: `Our partners are offering groundbreaking weapon systems powered by the latest technology. These systems promise to revolutionize national defense but come at a cost: escalating arms races and heightened tensions worldwide.
    
    While profits are soaring, the ethical implications and potential for misuse are undeniable. Choose progress, but remember: every action has a reaction.`,
          },
        ],
      },
      {
        label: "C) Sell licenses selectively",
        cred: 0,
        econ: +5,
        polar: +30,
        nextStep: "1.3",
        socialEmails: [
          {
            subject: "License Policy Sparks Accusations",
            snippet: "Allegations of favoritism surface.",
            content: `The decision to implement selective licensing has drawn backlash from nations excluded from access. Allegations of favoritism and corruption are surfacing, with smaller countries accusing us of catering to wealthy, powerful allies at their expense.
    
    While some view this as a balanced approach, critics argue that selective licensing creates inequalities that could destabilize international relations. The pressure is mounting, and the eyes of the world are watching our every move.`,
          },
        ],
        promoEmails: [
          {
            subject: "Strategic Licensing: Limited Opportunities",
            snippet: "Gain exclusive access.",
            content: `Partners are offering highly selective licensing opportunities for advanced technologies. These licenses are designed to empower trusted entities while maintaining a balance between innovation and control.
    
    This approach has sparked debate over fairness and transparency, but it ensures that only responsible actors can wield this transformative power. Explore these exclusive deals before they’re gone.`,
          },
        ],
      },
    ],
    
  },
  {
    id: "1.3",
    subject: "Exposing misuse",
    content: `Accusations of serious misuse of the technology, including espionage and manipulation, have surfaced. These allegations threaten to undermine trust and stability at both national and international levels.
    
    The world is divided: should we take the bold step of publishing these accusations and exposing the truth, knowing it could cause political unrest? Should we keep the information confidential to maintain stability, even if it raises questions about transparency? Or should we advocate for a joint investigation, balancing accountability and diplomacy? 
    
    The path we choose will define our stance on truth, trust, and responsibility.`,
    snippet: "Expose misuse, stay silent, or propose a joint investigation?",
    options: [
      {
        label: "A) Publish accusations",
        cred: +20,
        econ: -15,
        polar: +10,
        nextStep: "1.4",
        socialEmails: [
          {
            subject: "Global Outrage Erupts Over Espionage",
            snippet: "Public fury over leaked accusations.",
            content: `The publication of accusations related to espionage and manipulation has sent shockwaves across the globe. Citizens are demanding accountability, and governments are scrambling to address the fallout. 
    
    While some see this as a victory for transparency, others warn of the chaos it has unleashed. Protests are erupting in several countries, with accusations flying in all directions. Critics argue that exposing these issues without a clear plan for resolution has only deepened divisions and mistrust among nations.`,
          },
        ],
        promoEmails: [
          {
            subject: "Support the Truth: Transparency Technology Deals",
            snippet: "Promotions on tools for accountability.",
            content: `Our partners are offering exclusive discounts on technologies designed to enhance transparency and accountability. From secure communication platforms to data integrity tools, these innovations empower individuals and organizations to uncover and combat misuse.
    
    However, as transparency increases, so do tensions. While this initiative promotes openness, some fear that greater visibility could escalate existing conflicts.`,
          },
        ],
      },
      {
        label: "B) Keep accusations confidential",
        cred: -15,
        econ: +10,
        polar: 0,
        nextStep: "1.4",
        socialEmails: [
          {
            subject: "Secrecy Sparks Global Criticism",
            snippet: "Public distrust intensifies.",
            content: `The decision to keep accusations confidential has drawn sharp criticism from advocacy groups and international watchdogs. Many see this as an attempt to cover up serious issues, further eroding public trust.
    
    The lack of transparency has also fueled conspiracy theories, with some nations accusing others of gaining unfair advantages. While stability has been maintained for now, the long-term damage to credibility could prove irreversible.`,
          },
        ],
        promoEmails: [
          {
            subject: "Secure Systems for Confidential Operations",
            snippet: "Exclusive deals on secure platforms.",
            content: `In line with our decision to prioritize confidentiality, our partners are offering promotions on secure systems designed for sensitive operations. These tools ensure that critical information remains protected, even in the most volatile environments.
    
    While these solutions provide peace of mind, critics argue that they enable secrecy at the cost of accountability. Can security and trust truly coexist?`,
          },
        ],
      },
      {
        label: "C) Propose a joint investigation",
        cred: 0,
        econ: -10,
        polar: -10,
        nextStep: "1.4",
        socialEmails: [
          {
            subject: "Nations Unite for Global Investigation",
            snippet: "Joint efforts to address misuse.",
            content: `The proposal for a joint investigation into allegations of espionage and manipulation has been met with cautious optimism. Many nations see this as a chance to rebuild trust and cooperation, though the process will undoubtedly be fraught with challenges.
    
    Critics warn that the investigation could take years and may yield inconclusive results, leaving the underlying tensions unresolved. However, proponents argue that this approach strikes a balance between transparency and diplomacy, offering a path toward a more stable future.`,
          },
        ],
        promoEmails: [
          {
            subject: "Collaborative Security Solutions: New Offers",
            snippet: "Technology to strengthen partnerships.",
            content: `Our partners are launching exclusive promotions on collaborative security technologies. These tools are designed to facilitate joint investigations and ensure the integrity of sensitive information.
    
    This initiative underscores the importance of collective action in addressing global challenges. By investing in these solutions, we can pave the way for a more secure and cooperative future.`,
          },
        ],
      },
    ],
    
  },
  {
    id: "1.3",
    subject: "Exposing misuse",
    content: `Accusations of serious misuse of the technology, including espionage and manipulation, have surfaced. These allegations threaten to undermine trust and stability at both national and international levels.
    
    The world is divided: should we take the bold step of publishing these accusations and exposing the truth, knowing it could cause political unrest? Should we keep the information confidential to maintain stability, even if it raises questions about transparency? Or should we advocate for a joint investigation, balancing accountability and diplomacy? 
    
    The path we choose will define our stance on truth, trust, and responsibility.`,
    snippet: "Expose misuse, stay silent, or propose a joint investigation?",
    options: [
      {
        label: "A) Publish accusations",
        cred: +20,
        econ: -15,
        polar: +10,
        nextStep: "1.4",
        socialEmails: [
          {
            subject: "Global Outrage Erupts Over Espionage",
            snippet: "Public fury over leaked accusations.",
            content: `The publication of accusations related to espionage and manipulation has sent shockwaves across the globe. Citizens are demanding accountability, and governments are scrambling to address the fallout. 
    
    While some see this as a victory for transparency, others warn of the chaos it has unleashed. Protests are erupting in several countries, with accusations flying in all directions. Critics argue that exposing these issues without a clear plan for resolution has only deepened divisions and mistrust among nations.`,
          },
        ],
        promoEmails: [
          {
            subject: "Support the Truth: Transparency Technology Deals",
            snippet: "Promotions on tools for accountability.",
            content: `Our partners are offering exclusive discounts on technologies designed to enhance transparency and accountability. From secure communication platforms to data integrity tools, these innovations empower individuals and organizations to uncover and combat misuse.
    
    However, as transparency increases, so do tensions. While this initiative promotes openness, some fear that greater visibility could escalate existing conflicts.`,
          },
        ],
      },
      {
        label: "B) Keep accusations confidential",
        cred: -15,
        econ: +10,
        polar: 0,
        nextStep: "1.4",
        socialEmails: [
          {
            subject: "Secrecy Sparks Global Criticism",
            snippet: "Public distrust intensifies.",
            content: `The decision to keep accusations confidential has drawn sharp criticism from advocacy groups and international watchdogs. Many see this as an attempt to cover up serious issues, further eroding public trust.
    
    The lack of transparency has also fueled conspiracy theories, with some nations accusing others of gaining unfair advantages. While stability has been maintained for now, the long-term damage to credibility could prove irreversible.`,
          },
        ],
        promoEmails: [
          {
            subject: "Secure Systems for Confidential Operations",
            snippet: "Exclusive deals on secure platforms.",
            content: `In line with our decision to prioritize confidentiality, our partners are offering promotions on secure systems designed for sensitive operations. These tools ensure that critical information remains protected, even in the most volatile environments.
    
    While these solutions provide peace of mind, critics argue that they enable secrecy at the cost of accountability. Can security and trust truly coexist?`,
          },
        ],
      },
      {
        label: "C) Propose a joint investigation",
        cred: 0,
        econ: -10,
        polar: -10,
        nextStep: "1.4",
        socialEmails: [
          {
            subject: "Nations Unite for Global Investigation",
            snippet: "Joint efforts to address misuse.",
            content: `The proposal for a joint investigation into allegations of espionage and manipulation has been met with cautious optimism. Many nations see this as a chance to rebuild trust and cooperation, though the process will undoubtedly be fraught with challenges.
    
    Critics warn that the investigation could take years and may yield inconclusive results, leaving the underlying tensions unresolved. However, proponents argue that this approach strikes a balance between transparency and diplomacy, offering a path toward a more stable future.`,
          },
        ],
        promoEmails: [
          {
            subject: "Collaborative Security Solutions: New Offers",
            snippet: "Technology to strengthen partnerships.",
            content: `Our partners are launching exclusive promotions on collaborative security technologies. These tools are designed to facilitate joint investigations and ensure the integrity of sensitive information.
    
    This initiative underscores the importance of collective action in addressing global challenges. By investing in these solutions, we can pave the way for a more secure and cooperative future.`,
          },
        ],
      },
    ],
    
  },
  {
    id: "1.5",
    subject: "Democratic governance",
    content: `As global tensions continue to mount, a proposal has been made to establish a democratic global committee to oversee and manage the revolutionary technology. 
    
    This committee would aim to balance the needs of all nations, ensuring fair access and ethical use. However, detractors question whether a centralized democratic body can truly be impartial or effective.
    
    Should we endorse this transition, retain current control, or propose a hybrid governance model? Each path carries its own risks and opportunities.`,
    snippet: "Support democratic governance?",
    options: [
      {
        label: "A) Support governance",
        cred: +25,
        econ: -10,
        polar: 0,
        nextStep: "end",
        socialEmails: [
          {
            subject: "Global Unity Strengthened Through Democracy",
            snippet: "Nations rally behind democratic governance.",
            content: `The endorsement of a global democratic committee has been hailed as a historic move toward unity and equality. Leaders from across the world have expressed optimism, with many viewing this as a chance to rebuild trust and cooperation on a global scale. 
    
    Despite the support, skeptics warn that the committee's effectiveness will depend on its ability to overcome bureaucratic inefficiencies and avoid domination by powerful nations. As the committee begins its work, all eyes are on its first major decisions.`,
          },
        ],
        promoEmails: [
          {
            subject: "Special Offers for Democratic Projects",
            snippet: "Promotions supporting global collaboration.",
            content: `Our partners are proud to support initiatives that foster global unity and fairness. For a limited time, we’re offering exclusive deals on technologies designed for international collaboration and transparent governance.
    
    By investing in these tools, you can be part of the effort to create a more equitable future, where technology serves humanity as a whole.`,
          },
        ],
      },
      {
        label: "B) Maintain current control",
        cred: -15,
        econ: 0,
        polar: 0,
        nextStep: "end",
        socialEmails: [
          {
            subject: "Outrage Over Centralized Control",
            snippet: "Critics accuse leaders of power hoarding.",
            content: `The decision to maintain centralized control over the technology has sparked outrage among international leaders and citizens alike. Many accuse the current leadership of prioritizing their own power over global fairness.
    
    Protests have erupted in multiple nations, with activists demanding a more inclusive approach. Critics warn that this path risks alienating allies and eroding global trust, potentially leading to long-term instability.`,
          },
        ],
        promoEmails: [
          {
            subject: "Exclusive Promotions for Centralized Control",
            snippet: "Technology focused on efficiency and control.",
            content: `To support centralized management, our partners are offering special promotions on advanced control systems. These tools are designed to maximize efficiency and ensure seamless management of resources under a unified authority.
    
    However, as this approach prioritizes control over collaboration, it has raised questions about whether such strategies can sustain global cooperation in the long run.`,
          },
        ],
      },
      {
        label: "C) Propose a hybrid model",
        cred: +10,
        econ: 0,
        polar: +10,
        nextStep: "end",
        socialEmails: [
          {
            subject: "Hybrid Model Sparks Optimism and Debate",
            snippet: "Experts weigh in on compromise approach.",
            content: `The hybrid governance model, combining centralized oversight with democratic input, has been met with cautious optimism. Proponents see it as a pragmatic solution that balances efficiency and inclusivity. 
    
    However, critics argue that such a system may be prone to conflicts of interest and power struggles between the centralized authority and democratic representatives. The success of this model will depend on the ability to clearly define roles and responsibilities while maintaining transparency.`,
          },
        ],
        promoEmails: [
          {
            subject: "Innovative Solutions for Hybrid Governance",
            snippet: "Support balanced approaches to global challenges.",
            content: `In light of the proposed hybrid model, our partners are launching promotions on technologies that support both centralized management and democratic participation. These tools aim to bridge the gap between control and collaboration, offering innovative solutions to complex global challenges.
    
    By adopting these technologies, organizations can position themselves at the forefront of a new era of governance, where balance is key to progress.`,
          },
        ],
      },
    ],
    
  },
  {
    id: "end",
    subject: "Final Outcome",
    content: `Evaluate the final state of credibility, economy, and polarization to determine the ending.`,
    snippet: "Your decisions lead to the final outcome.",
    options: [],
  },
];

const storylineMonopolio = [
  {
    id: "3.1",
    subject: "Pricing strategy for technology access",
    content: `The technology is now available, but we must decide on pricing. Should we opt for high prices to maximize profit, affordable rates to reach more users, or a subscription system that provides a balanced approach?`,
    snippet: "High prices, accessible rates, or subscriptions?",
    options: [
      {
        label: "A) High prices",
        cred: -10,
        econ: +20,
        polar: +10,
        nextStep: "3.2",
        socialEmails: [
          {
            subject: "Outrage Over Exclusive Pricing",
            snippet: "Activists condemn greed and inequality.",
            content: `The decision to impose high prices on this revolutionary technology has sparked outrage worldwide. Protests are erupting in major cities as activists accuse you of prioritizing profit over fairness. 
  
            "How can you justify denying life-changing technology to those who need it most?" said one protester. 
  
            The pressure to reconsider this pricing strategy is mounting, as public trust in your organization continues to erode.`,
          },
        ],
        promoEmails: [
          {
            subject: "Exclusive Access: Only for the Elite",
            snippet: "Luxury solutions for the select few.",
            content: `Experience the pinnacle of technological advancement with our exclusive offer. Only a privileged few will gain access to this groundbreaking innovation. Secure your spot among the elite today!
  
            Availability is limited to ensure the highest quality and exclusivity for our valued customers.`,
          },
        ],
      },
      {
        label: "B) Accessible rates",
        cred: +15,
        econ: -15,
        polar: 0,
        nextStep: "3.2",
        socialEmails: [
          {
            subject: "Applause for Affordable Innovation",
            snippet: "Global praise for inclusivity.",
            content: `The decision to make this technology accessible has been lauded as a milestone in promoting equality and progress. Citizens across the world are celebrating, with one viral tweet stating:
  
            "Finally, a company that puts people before profit."
  
            However, some industry experts warn that the reduced profit margins may limit the resources available for future advancements.`,
          },
        ],
        promoEmails: [
          {
            subject: "Innovation for Everyone",
            snippet: "Affordable technology for a brighter future.",
            content: `We've made the impossible possible: affordable rates for the most revolutionary technology in history. 
  
            Join us as we build a future that includes everyone, not just the wealthy. Act now and take advantage of this unique opportunity to change your life!`,
          },
        ],
      },
      {
        label: "C) Subscription system",
        cred: 0,
        econ: +10,
        polar: +5,
        nextStep: "3.2",
        socialEmails: [
          {
            subject: "Debate Over Subscription Model",
            snippet: "A middle ground or a hidden trap?",
            content: `The subscription model has sparked mixed reactions. While some praise its flexibility, others accuse you of creating a system that perpetuates inequality. 
  
            "You're turning progress into a never-ending bill," said a frustrated critic. 
  
            Meanwhile, analysts are watching closely to see if this approach can sustain long-term growth and trust.`,
          },
        ],
        promoEmails: [
          {
            subject: "Subscribe to the Future",
            snippet: "The ultimate innovation, one payment at a time.",
            content: `For a low monthly fee, access the most advanced technology in history. Flexible plans for every need—but act fast, as demand is skyrocketing!
  
            Subscriptions include exclusive benefits and regular updates to keep you ahead in the race for innovation.`,
          },
        ],
      },
    ],
  },
  
  {
    id: "3.2",
    subject: "Customer focus or technological expansion?",
    content: `With the technology now in the hands of users, the question arises: where should we allocate our resources? Existing customers demand immediate upgrades to address flaws and improve usability. However, investing in research and development could lead to groundbreaking advancements, securing a competitive edge for the future. A balanced approach is also on the table, but it risks stretching resources too thin. The choice is yours.`,
    snippet: "Prioritize customers or invest in expansion?",
    options: [
      {
        label: "A) Focus on customers",
        cred: -40,
        econ: +15,
        polar: 0,
        nextStep: "3.3",
        socialEmails: [
          {
            subject: "Praise for Customer-Centric Strategy",
            snippet: "Loyal users applaud your commitment.",
            content: `Your decision to prioritize customer needs has earned widespread praise among your user base. 
  
            "Finally, a company that listens to its customers," one user tweeted, echoing the sentiment of many. 
  
            However, industry analysts warn that this short-term focus may come at the cost of falling behind competitors in innovation. Will immediate satisfaction outweigh the risk of losing your technological edge?`,
          },
        ],
        promoEmails: [
          {
            subject: "Enhanced Features for Loyal Customers",
            snippet: "Discover the latest updates.",
            content: `We're thrilled to unveil a suite of improvements tailored to your needs. Experience enhanced performance, new features, and superior reliability—because you deserve the best.
  
            Upgrade your experience today and see the difference customer-focused innovation makes!`,
          },
        ],
      },
      {
        label: "B) Invest in expansion",
        cred: +20,
        econ: -10,
        polar: 0,
        nextStep: "3.3",
        socialEmails: [
          {
            subject: "Concerns Over Neglecting Existing Customers",
            snippet: "Users question your priorities.",
            content: `Your bold decision to invest heavily in research and expansion has sparked concerns among your existing user base. 
  
            "They've abandoned us for the future," said one disgruntled customer.
  
            Despite the backlash, experts agree this move could secure long-term dominance in the market. Can you weather the storm of criticism and emerge stronger than ever?`,
          },
        ],
        promoEmails: [
          {
            subject: "The Future Is Coming",
            snippet: "Get ready for the next generation of technology.",
            content: `We're working tirelessly to bring you the innovations of tomorrow. Stay tuned for revolutionary breakthroughs that will redefine what's possible.
  
            The future is closer than you think—are you ready to embrace it?`,
          },
        ],
      },
      {
        label: "C) Split resources",
        cred: 0,
        econ: 0,
        polar: +10,
        nextStep: "3.3",
        socialEmails: [
          {
            subject: "A Balanced Approach Sparks Debate",
            snippet: "Neither fully satisfied nor entirely upset.",
            content: `Your decision to split resources between customer satisfaction and technological expansion has left stakeholders divided. 
  
            "It's a reasonable compromise," said one analyst, while others argue, "Trying to do everything might mean achieving nothing."
  
            While this approach maintains some goodwill, the lack of a bold stance could weaken your position in a competitive market. Is balance enough to satisfy everyone?`,
          },
        ],
        promoEmails: [
          {
            subject: "Innovation Meets Customer Care",
            snippet: "The best of both worlds.",
            content: `We're striking a balance to ensure you get the best of today and tomorrow. Enjoy immediate updates while we work on bringing you the next wave of groundbreaking advancements.
  
            Together, we're building a brighter, more innovative future—starting now!`,
          },
        ],
      },
    ],
  },
  
  {
    id: "3.3",
    subject: "Infrastructure or profit maximization?",
    content: `As we look to the future, a critical choice lies ahead: should we focus on expanding global infrastructure to improve efficiency and accessibility, or prioritize generating immediate revenue to strengthen our financial position? Alternatively, we could attempt to strike a balance, though such an approach might dilute both efforts. Each path presents unique risks and rewards.`,
    snippet: "Expand infrastructure or maximize profits?",
    options: [
      {
        label: "A) Expand infrastructure",
        cred: +15,
        econ: -15,
        polar: 0,
        nextStep: "3.4",
        socialEmails: [
          {
            subject: "Praise for Infrastructure Investment",
            snippet: "Long-term vision earns global respect.",
            content: `Your decision to prioritize infrastructure development has been widely applauded by global leaders and advocacy groups. 
  
            "This is a step toward a more connected and equitable future," said a United Nations representative. 
  
            However, shareholders have raised concerns over reduced short-term profits, warning that the financial strain could limit your ability to respond to market opportunities.`,
          },
        ],
        promoEmails: [
          {
            subject: "Building the Foundation for Tomorrow",
            snippet: "Invest in global efficiency.",
            content: `We're excited to announce new initiatives aimed at enhancing global infrastructure, ensuring more people have access to our technology.
  
            Together, we're paving the way for a better-connected future. Join us as we embark on this transformative journey!`,
          },
        ],
      },
      {
        label: "B) Maximize profits",
        cred: -10,
        econ: +20,
        polar: 0,
        nextStep: "3.4",
        socialEmails: [
          {
            subject: "Criticism Over Profit-Driven Approach",
            snippet: "Public outcry grows over perceived greed.",
            content: `Your decision to prioritize immediate revenue has sparked backlash from advocacy groups and users who feel left behind. 
  
            "They're profiting at the expense of progress," said one activist. 
  
            While shareholders celebrate the financial gains, experts warn that neglecting infrastructure could jeopardize long-term growth and global goodwill.`,
          },
        ],
        promoEmails: [
          {
            subject: "Profitability at Its Peak",
            snippet: "Exclusive deals for top-tier customers.",
            content: `Our commitment to profitability means we can offer unparalleled value to our premium customers. Enjoy exclusive access to the latest innovations at competitive rates.
  
            Don't miss out—profits mean progress for those who invest wisely.`,
          },
        ],
      },
      {
        label: "C) Find a balance",
        cred: 0,
        econ: +10,
        polar: +10,
        nextStep: "3.4",
        socialEmails: [
          {
            subject: "Balanced Strategy Sparks Debate",
            snippet: "A cautious path divides opinions.",
            content: `Your attempt to balance infrastructure investment and profit maximization has drawn mixed reactions. 
  
            "It's a sensible compromise," said one analyst, while critics argue, "Trying to do both might lead to mediocrity in both areas."
  
            While this decision maintains some financial stability, the lack of a bold stance may leave stakeholders questioning your long-term strategy.`,
          },
        ],
        promoEmails: [
          {
            subject: "Building and Growing Simultaneously",
            snippet: "The best of both worlds.",
            content: `We're balancing the need for immediate profitability with our commitment to building a sustainable future. 
  
            Join us as we continue to innovate and expand our reach—ensuring the benefits of progress are shared by all.`,
          },
        ],
      },
    ],
  },
  {
    id: "3.4",
    subject: "Exclusive or open patents?",
    content: `A critical decision now faces us: several major corporations are demanding exclusive rights to use our revolutionary technology. Granting these patents could bring significant financial gains but may limit accessibility and stifle innovation. Alternatively, we could leave the patents open to all, fostering widespread progress but risking loss of control and profits. A third option is partial licensing—balancing exclusivity with broader access—but it might satisfy neither side.`,
    snippet: "Exclusive patents or open access?",
    options: [
      {
        label: "A) Exclusive patents",
        cred: -10,
        econ: +20,
        polar: +10,
        nextStep: "3.5",
        socialEmails: [
          {
            subject: "Exclusive Patents Trigger Public Outrage",
            snippet: "Critics denounce corporate favoritism.",
            content: `Your decision to grant exclusive patents has sparked outrage among innovators and activists. 
  
            "This move empowers a few corporations while suppressing smaller competitors," one critic stated. 
  
            While corporations celebrate their monopoly, smaller businesses and developing nations are left struggling, and public opinion is increasingly turning against you.`,
          },
        ],
        promoEmails: [
          {
            subject: "Exclusive Deals for Industry Leaders",
            snippet: "Empowering top corporations.",
            content: `With exclusive patents in place, we're partnering with industry leaders to drive progress in cutting-edge innovation.
  
            This strategy ensures rapid technological advancement while securing significant financial returns. Join us as we shape the future!`,
          },
        ],
      },
      {
        label: "B) Open patents",
        cred: +20,
        econ: -15,
        polar: 0,
        nextStep: "3.5",
        socialEmails: [
          {
            subject: "Praise for Open Access",
            snippet: "Widespread innovation applauded.",
            content: `Your decision to leave patents open to all has been widely celebrated by innovators and advocates for equality. 
  
            "This ensures everyone can benefit from this breakthrough," said a prominent researcher. 
  
            However, critics argue that this choice risks financial instability and loss of control, as some corporations exploit the technology for unchecked profit.`,
          },
        ],
        promoEmails: [
          {
            subject: "Technology for Everyone",
            snippet: "Empowering global progress.",
            content: `With open patents, we're ensuring that our technology is accessible to innovators everywhere. This approach promotes widespread collaboration and progress.
  
            Together, we can harness this breakthrough for the benefit of all humanity.`,
          },
        ],
      },
      {
        label: "C) Partial licensing",
        cred: 0,
        econ: 0,
        polar: +5,
        nextStep: "3.5",
        socialEmails: [
          {
            subject: "Partial Licensing Strategy Sparks Debate",
            snippet: "Balancing exclusivity and accessibility.",
            content: `Your decision to implement partial licensing has divided opinions. 
  
            "This approach balances innovation and control," said one analyst, but others argue, "It risks alienating both corporations and smaller innovators."
  
            While this strategy maintains some financial stability, critics warn that its compromises may hinder long-term progress.`,
          },
        ],
        promoEmails: [
          {
            subject: "Strategic Partnerships Through Licensing",
            snippet: "Balanced opportunities for innovation.",
            content: `Partial licensing ensures both control and collaboration. We're working with select partners to maximize the impact of this revolutionary technology while keeping the door open for broader contributions.
  
            Join us in shaping a future of balanced progress.`,
          },
        ],
      },
    ],
  },
  
  {
    id: "3.5",
    subject: "Corporate alliances or independence?",
    content: `The final decision looms: major corporations are proposing exclusive partnerships to jointly control the distribution of our groundbreaking technology. Accepting their offer could secure massive financial gains and a stable distribution network, but it risks ceding influence to private interests. Alternatively, staying independent ensures complete autonomy but sacrifices the resources and infrastructure these alliances provide. A third option—a hybrid system—might offer a middle ground, but could complicate decision-making and sow distrust among stakeholders.`,
    snippet: "Accept alliances or stay independent?",
    options: [
      {
        label: "A) Accept alliances",
        cred: -15,
        econ: +25,
        polar: 0,
        nextStep: "end",
        socialEmails: [
          {
            subject: "Corporate Alliances Raise Ethical Concerns",
            snippet: "Public distrust in corporate control.",
            content: `Your decision to ally with major corporations has drawn fierce backlash from advocacy groups and the public. 
  
            "This is a blatant handover of power to profit-driven entities," one activist stated. 
  
            While corporations celebrate the move as a step toward stability, critics argue it undermines public trust and risks prioritizing profit over equitable access.`,
          },
        ],
        promoEmails: [
          {
            subject: "Exclusive Access Through Corporate Partnerships",
            snippet: "A new era of collaboration.",
            content: `By partnering with leading corporations, we are revolutionizing the distribution of our technology. These alliances promise unprecedented efficiency and innovation.
  
            Join us in this new chapter of progress and profitability.`,
          },
        ],
      },
      {
        label: "B) Stay independent",
        cred: +15,
        econ: -20,
        polar: 0,
        nextStep: "end",
        socialEmails: [
          {
            subject: "Independence Celebrated but Risks Loom",
            snippet: "Autonomy comes at a cost.",
            content: `Your decision to remain independent has been hailed by advocates for innovation and transparency. 
  
            "This ensures the technology serves humanity, not corporate greed," one supporter commented. 
  
            However, critics warn of potential resource shortages and inefficiencies, with some questioning whether independence is sustainable in the long run.`,
          },
        ],
        promoEmails: [
          {
            subject: "Innovation Without Compromise",
            snippet: "The path of independence.",
            content: `Remaining independent allows us to maintain full control over the technology, ensuring it aligns with our vision for the future.
  
            Join us as we embrace innovation without compromise.`,
          },
        ],
      },
      {
        label: "C) Create a hybrid system",
        cred: 0,
        econ: 0,
        polar: +10,
        nextStep: "end",
        socialEmails: [
          {
            subject: "Hybrid System Sparks Mixed Reactions",
            snippet: "Collaboration or confusion?",
            content: `Your decision to implement a hybrid system of shared control has led to widespread debate. 
  
            "This balances the benefits of alliances with the need for oversight," said one analyst, but others argue, "It introduces complexity and risks diluting accountability." 
  
            While this approach avoids extremes, it faces challenges in maintaining transparency and trust.`,
          },
        ],
        promoEmails: [
          {
            subject: "Balancing Progress with Collaboration",
            snippet: "Innovative partnerships, shared goals.",
            content: `The hybrid system ensures both corporate collaboration and independent oversight, striking a balance between progress and accountability.
  
            Explore the opportunities this innovative approach offers.`,
          },
        ],
      },
    ],
  },  
  
  {
    id: "end",
    subject: "Final Outcome",
    content: `Evaluate the final state of credibility, economy, and polarization to determine the ending.`,
    snippet: "Your decisions lead to the final outcome.",
    options: [],
  },
];

const storylineRegulada = [
    {
      id: "2.1",
      subject: "Quota system controversy",
      content: `The international committee is under fire as several nations accuse it of favoring economic powers in the distribution of resources derived from the revolutionary technology. Critics argue that the current quota system perpetuates inequality, while proponents claim it ensures efficiency and stability. 
    
    Should we defend the existing system, propose a redistribution to address inequities, or leave the matter to individual governments? Each path will shape the future of this committee—and the trust it commands.`,
      snippet: "Maintain quotas, redistribute, or leave to governments?",
      options: [
        {
          label: "A) Maintain current system",
          cred: 0,
          econ: +10,
          polar: +15,
          nextStep: "2.2",
          socialEmails: [
            {
              subject: "Support for Current Quotas Divides Opinion",
              snippet: "Defending the status quo sparks debate.",
              content: `By supporting the current quota system, we have reinforced the trust of major economic powers, who applaud our commitment to stability and efficiency. 
    
              However, smaller nations accuse the committee of prioritizing the interests of wealthier countries. Protests are breaking out in various regions, with calls for a more equitable approach to resource distribution growing louder. Can this system survive the mounting criticism?`,
            },
          ],
          promoEmails: [
            {
              subject: "Efficient Allocation Ensured Under Current Quotas",
              snippet: "Innovation meets stability.",
              content: `Our decision to uphold the current quotas allows us to continue delivering resources where they are most needed for growth and progress.
    
              Discover opportunities to collaborate under a stable and efficient framework.`,
            },
          ],
        },
        {
          
            label: "B) Redistribute resources",
            cred: +20,
            econ: -15,
            polar: -5,
            nextStep: "2.2",
            socialEmails: [
              {
                subject: "Redistribution Sparks Praise and Concern",
                snippet: "Equity vs. efficiency debate intensifies.",
                content: `In a bold move, the committee has decided to advocate for the redistribution of resources, prioritizing equity over traditional efficiency models. Developing nations and equality advocates have lauded this decision, calling it a step toward justice.
          
                "This marks a turning point for global fairness," remarked a prominent economist supporting the redistribution effort. Protests demanding more inclusive policies have subsided in several regions, signaling widespread approval from previously marginalized nations.
          
                However, this decision has not come without backlash. Economic powers argue that redistributing resources jeopardizes global stability and diminishes innovation. Some nations have begun threatening to withdraw from trade agreements, citing a loss of trust in the committee's leadership. The tension between equity and efficiency has never been more palpable.`,
              },
              {
                subject: "Developing Nations Applaud Redistribution",
                snippet: "A step toward reducing inequalities.",
                content: `For decades, smaller economies have struggled to keep up with the technological advances of larger nations. Our recent decision to redistribute resources is being hailed as a long-overdue step toward leveling the playing field.
          
                Grassroots organizations in developing regions have expressed overwhelming support, with one activist stating, "Finally, we have a chance to compete on equal footing." However, critics warn that this decision could reduce incentives for innovation among wealthier nations, sparking debates about long-term consequences.
          
                As the policy begins to take effect, the world watches closely to see whether equity and growth can truly coexist.`,
              },
            ],
            promoEmails: [
              {
                subject: "Empowering Equal Access Through Redistribution",
                snippet: "Building a fairer future.",
                content: `By committing to a policy of resource redistribution, we are forging a path toward a more inclusive global system. This decision ensures that even the smallest nations gain access to the tools and technologies necessary for transformative growth.
          
                Redistribution isn't just about fairness; it's about unlocking untapped potential worldwide. With equal access to resources, innovation can emerge from the most unexpected corners of the globe.
          
                We invite you to join us in supporting this initiative to build a future where no nation is left behind. Together, we can redefine the global narrative and foster a truly interconnected world.`,
              },
              {
                subject: "Transformative Opportunities for All Nations",
                snippet: "Special offers for equitable development.",
                content: `As part of the global redistribution initiative, we are launching a series of promotions aimed at empowering nations previously left behind in the technological race. These exclusive deals include discounted access to cutting-edge tools, infrastructure support, and collaborative research platforms.
          
                By participating in this initiative, you are not just investing in technology—you are investing in a more balanced, equitable future for everyone. Together, we can turn the promise of redistribution into reality, fostering growth and innovation where it is needed most.`,
              },
            ],
          },
          
        {
          label: "C) Leave to governments",
          cred: -5,
          econ: +5,
          polar: +20,
          nextStep: "2.2",
          socialEmails: [
            {
              subject: "Decentralization Sparks Chaos",
              snippet: "Governments clash over resource control.",
              content: `Our decision to leave resource distribution to individual governments has caused a surge in geopolitical conflicts. 
    
              "This is a recipe for disaster," warned one analyst, as powerful nations begin leveraging their influence to secure larger shares of resources. Smaller nations feel abandoned, and trust in the committee's ability to lead is rapidly eroding.`,
            },
          ],
          promoEmails: [
            {
              subject: "Decentralized Solutions for Local Needs",
              snippet: "Flexibility for governments.",
              content: `By stepping back and allowing governments to take control, we ensure resources are distributed according to local priorities.
    
              Explore the opportunities for independent collaboration under this new approach.`,
            },
          ],
        },
      ],
    
  },
  {
    id: "2.2",
    subject: "Prioritization dilemma",
    content: `Energy resources are being disproportionately used for industrial growth rather than addressing humanitarian crises. 
Which sector should take priority?`,
    snippet: "Prioritize humanitarian or industrial use?",
    options: [
      {
        label: "A) Prioritize humanitarian needs",
        cred: +15,
        econ: -20,
        polar: 0,
        nextStep: "2.3",
      },
      {
        label: "B) Prioritize industrial growth",
        cred: -10,
        econ: +20,
        polar: +10,
        nextStep: "2.3",
      },
      {
        label: "C) Strike a balance",
        cred: +5,
        econ: -10,
        polar: +5,
        nextStep: "2.3",
      },
    ],
  },
  {
    id: "2.3",
    subject: "Transparency demands",
    content: `Activist groups are demanding full transparency of the committee's agreements with governments. 
How should we respond?`,
    snippet: "Reveal, redact, or maintain confidentiality?",
    options: [
      {
        label: "A) Publish all agreements",
        cred: +10,
        econ: -10,
        polar: -15,
        nextStep: "2.4",
      },
      {
        label: "B) Maintain confidentiality",
        cred: -10,
        econ: 0,
        polar: +15,
        nextStep: "2.4",
      },
      {
        label: "C) Publish partially redacted agreements",
        cred: 0,
        econ: -5,
        polar: +10,
        nextStep: "2.4",
      },
    ],
  },
  {
    id: "2.4",
    subject: "International conflict resolution",
    content: `Two major powers are locked in a dispute over access to the technology. 
Should we intervene, mediate, or allow them to resolve it independently?`,
    snippet: "Intervene, mediate, or let them handle it?",
    options: [
      {
        label: "A) Intervene directly",
        cred: +15,
        econ: -15,
        polar: -20,
        nextStep: "2.5",
      },
      {
        label: "B) Propose mediation",
        cred: +10,
        econ: -10,
        polar: -10,
        nextStep: "2.5",
      },
      {
        label: "C) Do not intervene",
        cred: -10,
        econ: 0,
        polar: +15,
        nextStep: "2.5",
      },
    ],
  },
  {
    id: "2.5",
    subject: "Internal vs external conflicts",
    content: `Internal disagreements within the committee are rising, while international tensions worsen. 
Where should we focus our efforts?`,
    snippet: "Resolve internal or external disputes?",
    options: [
      {
        label: "A) Resolve internal conflicts",
        cred: -10,
        econ: 0,
        polar: -10,
        nextStep: "end",
      },
      {
        label: "B) Focus on external tensions",
        cred: +15,
        econ: 0,
        polar: +10,
        nextStep: "end",
      },
      {
        label: "C) Balance both efforts",
        cred: +5,
        econ: -10,
        polar: -5,
        nextStep: "end",
      },
    ],
  },
  {
    id: "end",
    subject: "Final Outcome",
    content: `Evaluate the final state of credibility, economy, and polarization to determine the ending.`,
    snippet: "Your decisions lead to the final outcome.",
    options: [],
  },
];

const initialEmail = {
  id: "intro",
  subject: "Revolutionary Technology: Choose your approach",
  snippet: "Global access, Monopoly, or Regulated",
  content: `A revolutionary discovery has emerged: a technology capable of generating unlimited energy. The possibilities are endless—ending poverty, powering innovation, reshaping humanity’s future. But such immense power demands an even greater decision.
  Will you choose to share this miracle with the world, risking chaos in the name of equality? Will you guard its secrets, monopolizing its benefits for the select few? Or will you enforce strict regulation, seeking to balance control and progress?

  Every choice has consequences. Every path will alter history. The eyes of the world are on you—what kind of legacy will you leave?`,
  
  options: [
    { label: "Global Access", line: "A" },
    { label: "Monopoly", line: "B" },
    { label: "Regulated", line: "C" },
  ],
};

const initialSocialPool = [
  {
    id: 101,
    subject: "Invitation to a social event",
    snippet: "Galactic party next Saturday...",
    content: "Social mail #1...",
    revisado: false,
    starred: false,
  },
  {
    id: 102,
    subject: "Meeting of stellar neighbors",
    snippet: "We're getting together to celebrate...",
    content: "Social mail #2...",
    revisado: false,
    starred: false,
  },
];

const initialPromotionsPool = [
  {
    id: 201,
    subject: "Interstellar discounts",
    snippet: "Travel offers...",
    content: "Promotions on galactic routes.",
    revisado: false,
    starred: false,
  },
  {
    id: 202,
    subject: "Special coupon",
    snippet: "20% discount...",
    content: "Limited promotion.",
    revisado: false,
    starred: false,
  },
];

function App() {
  const [brokenScreenActive, setBrokenScreenActive] = useState(false);
  const [credibilidad, setCredibilidad] = useState(100);
  const [polarizacion, setPolarizacion] = useState(50);
  const [economia, setEconomia] = useState(70);
  const [activeList, setActiveList] = useState("principal");
  const [showComposePopup, setShowComposePopup] = useState(false);
  const [composeText, setComposeText] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentLine, setCurrentLine] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(null);
  const [usedSteps, setUsedSteps] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [socialPool, setSocialPool] = useState(initialSocialPool);
  const [selectedEmailSocial, setSelectedEmailSocial] = useState(null);
  const [promotionsPool, setPromotionsPool] = useState(initialPromotionsPool);
  const [selectedEmailPromo, setSelectedEmailPromo] = useState(null);
  const [selectedEmailStarred, setSelectedEmailStarred] = useState(null);
  const clickAudioRef = useRef(null);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(true);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const triggerGlitchEffect = (duration = 500) => {
    setGlitchActive(true); 
    setTimeout(() => {
      setGlitchActive(false); 
    }, duration);
  };
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  


  const [musicVolume, setMusicVolume] = useState(50);
  const [sfxVolume, setSfxVolume] = useState(50);
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const [isSfxMuted, setIsSfxMuted] = useState(false);
 
 
  const sfxVolumeRef = useRef(sfxVolume);
  const isSfxMutedRef = useRef(isSfxMuted);
  const [showTutorial, setShowTutorial] = useState(true);
const [isVisible, setIsVisible] = useState(false);
const [message, setMessage] = useState("");
const importantAudioRef = useRef(null);

const showImportantMessage = (msg) => {
  importantAudioRef.current = new Audio(Important);
  setMessage(msg);
  setIsVisible(true);
  importantAudioRef.current.addEventListener('canplaythrough', () => {
    importantAudioRef.current.volume = isSfxMutedRef.current ? 0 : sfxVolumeRef.current / 100;
    importantAudioRef.current.play().catch(() => {});
  });
};
const closeImportantMessage = () => {
  setIsVisible(false);
  setMessage("");
};
useEffect(() => {
  window.showImportantMessage = showImportantMessage;
  return () => {
    delete window.showImportantMessage;
  };
}, []);
  const audioErrorRef = useRef(null);
  const handleShowPopup = (message) => {
    audioErrorRef.current = new Audio(Error);
    setPopupMessage(message);
    setShowPopup(true);
    audioErrorRef.current.addEventListener('canplaythrough', () => {
      audioErrorRef.current.volume =  isSfxMutedRef.current ? 0 : sfxVolumeRef.current / 100;
      audioErrorRef.current.play().catch(() => {});
    }); 
    triggerGlitchEffect(); 
  };
  useEffect(() => {
    sfxVolumeRef.current = sfxVolume;
  }, [sfxVolume]);

  useEffect(() => {
    isSfxMutedRef.current = isSfxMuted;
  }, [isSfxMuted]);
  useEffect(() => {
  if (clickAudioRef.current) {
    clickAudioRef.current.volume = isSfxMuted ? 0 : sfxVolume / 100;
  }
}, [sfxVolume, isSfxMuted]);

useEffect(() => {
  if (audioErrorRef.current) {
    audioErrorRef.current.volume = isSfxMuted ? 0 : sfxVolume / 100;
  }
}, [sfxVolume, isSfxMuted]);
  
  const handleClosePopup = () => {
    setShowPopup(false);
    setPopupMessage("");
  };
  const handleTutorialComplete = () => {
    setShowTutorial(false);
  };
  
 
  useEffect(() => {
    let overlayOpacity = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--overlay-opacity")
    );
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    const specialEventsTimer = async () => {
      const overlayOpacityVariation = Math.min(1, overlayOpacity + 0.1);
      document.documentElement.style.setProperty("--overlay-opacity", overlayOpacityVariation);
      overlayOpacity = overlayOpacityVariation;
      await delay(1000);
    };
    let ligths = false; 
    let broken = false;
    let spectrum = false;
    const interval = setInterval(() => {
      specialEventsTimer();
      if (economia < 60) {
        document.documentElement.style.setProperty("--ligths", "visible");
        if (!ligths) { 
          showImportantMessage("Our economy can no longer support paying for electricity, and as a result, our computers and other essential electrical devices are at risk of failing.");
          ligths = true; 
        }
      } else {
        document.documentElement.style.setProperty("--ligths", "hidden");
        ligths = false; 
      }
      if(credibilidad < 70) {
        if (!broken) {
          showImportantMessage("The credibility of our organization is at an all-time low. We must take immediate action to restore trust and confidence in our decisions, multiple protest have rise.");
          triggerBrokenScreenEffect(10000);
          broken = true;
        }

      } else {
        broken = false;
      }
      if(polarizacion < 30 || polarizacion > 70) {
        if (!spectrum) {
          showImportantMessage("The polarization of our society is reaching dangerous levels, hackers have taken control of our screens and are broadcasting messages of hate and division.");
          startSpectrumHackEffect(10000,1000);
          spectrum = true;
        }

      } else {
        spectrum = false;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [economia]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty("--pointerX", e.clientX + "px");
      document.documentElement.style.setProperty("--pointerY", e.clientY + "px");
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleOpenCompose = () => setShowComposePopup(true);
  const handleCloseCompose = () => {
    setShowComposePopup(false);
    setComposeText("");
  };
  /**
 * Activa el efecto de pantalla rota por un tiempo definido.
 * @param {number} duration - Duración del efecto en milisegundos.
 */
const triggerBrokenScreenEffect = (duration = 3000) => {
  setBrokenScreenActive(true); // Activa el efecto

  setTimeout(() => {
    setBrokenScreenActive(false); // Desactiva el efecto después del tiempo especificado
  }, duration);
};
  const handleSendCompose = () => {
    if (!composeText.trim()) {
      setErrorMessage("You cannot send an empty email.");
      setShowErrorPopup(true);
      setShowComposePopup(false);
      return;
    }

    setShowComposePopup(false);
    setComposeText("");
  };

  const handleCloseError = () => {
    setShowErrorPopup(false);
    setErrorMessage("");
  };

  const handleStartGame = () => {
    setShowStartMenu(false);
  };

  // Ejemplo de handler para “Opciones”
  const handleShowOptions = () => {
   
    // Por ejemplo:
    setShowStartMenu(false);
    setShowOptionsMenu(true);
  };

  const handleCloseOptions = () => {
    setShowOptionsMenu(false);
    // setShowStartMenu(true); // SOLO si quieres regresar al menú
  };

  function getStoryline() {
    if (currentLine === "A") return storylineAccesoGlobal;
    if (currentLine === "B") return storylineMonopolio;
    if (currentLine === "C") return storylineRegulada;
    return null; 
  }

  const handleMusicVolumeChange = (event) => {
    const newVol = +event.target.value;
    setMusicVolume(newVol);
    // Si tienes un audioRef para la música, 
    // podrías hacer audioRef.current.volume = newVol / 100
  };
  const toggleMusicMute = () => {
    setIsMusicMuted((prev) => !prev);
    // Igualmente, si hay un audioRef, 
    // audioRef.current.muted = !audioRef.current.muted
  };

  // Lo mismo para los SFX
  const handleSfxVolumeChange = (event) => {
    const newVol = +event.target.value;
    setSfxVolume(newVol);
    // Si tienes referenciados tus sonidos SFX, ajusta su volumen.
  };
  const toggleSfxMute = () => {
    setIsSfxMuted((prev) => !prev);
  };


  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  function getCurrentStep() {
    if (!currentLine) {
      return initialEmail;
    }
    const line = getStoryline();
    if (!line || currentStepIndex == null) return null;
    return line[currentStepIndex];
  }
  useEffect(() => {
    if (clickAudioRef.current) {
      clickAudioRef.current.volume = isSfxMuted ? 0 : sfxVolume / 100;
    }
  }, [sfxVolume, isSfxMuted]);

  useEffect(() => {
    if (audioErrorRef.current) {
      audioErrorRef.current.volume = isSfxMuted ? 0 : sfxVolume / 100;
    }
  }, [sfxVolume, isSfxMuted]);
  
  const newAudioMail = useRef(null);
  const handleIntroDecision = (line) => {
    setCurrentLine(line);
    setCurrentStepIndex(0);
    setSelectedEmail(null);
    triggerBrokenScreenEffect(7000);
    handleShowPopup(`This will have consequences...`);
    newAudioMail.current = new Audio(NewMail);
    newAudioMail.current.addEventListener('canplaythrough', () => {
      newAudioMail.current.volume = isSfxMutedRef.current ? 0 : sfxVolumeRef.current / 100;
      newAudioMail.current.play().catch(() => {});
    });
  };
  useEffect(() => {
    clickAudioRef.current = new Audio(Click);

    const mouseDownHandler = (e) => {
      if (e.button === 0 || e.button === 2) {
        clickAudioRef.current.volume = isSfxMuted ? 0 : (sfxVolume / 100);
        clickAudioRef.current.play().catch(() => {});
      }
    };
    window.addEventListener("mousedown", mouseDownHandler);
    return () => {
      window.removeEventListener("mousedown", mouseDownHandler);
    };
  }, []);

const handleFinalOutcome = () => {
  // Resumen de estado final
  alert(`Final Results:
  Credibility: ${credibilidad}
  Economy: ${economia}
  Polarization: ${polarizacion}`);

  // Reproduce un sonido especial
  const finalAudio = new Audio(Important);
  finalAudio.play().catch(() => {});

  // Activa un efecto visual (puedes usar `triggerGlitchEffect` o crear uno nuevo)
  triggerGlitchEffect(5000);
};

  const handleLineDecision = (option) => {
    const unreadSocial = socialPool.some((email) => !email.revisado);
    const unreadPromotions = promotionsPool.some((email) => !email.revisado);
  
    if (unreadSocial || unreadPromotions) {
      alert("Please read all pending emails in the Social and Promotions tabs before proceeding.");
      return;
    }
    if (option.cred) {
      setCredibilidad((prev) => clamp(prev + option.cred, 0, 100));
    }
    if (option.econ) {
      setEconomia((prev) => clamp(prev + option.econ, 0, 100));
    }
    if (option.polar) {
      setPolarizacion((prev) => clamp(prev + option.polar, 0, 100));
    }
    const step = getCurrentStep();
    if (step) {
      setUsedSteps((prev) => [{ ...step, chosen: option.label }, ...prev]);
    }
    if (option.socialEmails) {
      setSocialPool((prev) => [
        ...option.socialEmails.map((email) => ({
          ...email,
          id: Date.now() + Math.random(), 
          revisado: false,
          starred: false,
        })),
        ...prev, 
      ]);
    }
    if (option.promoEmails) {
      setPromotionsPool((prev) => [
        ...option.promoEmails.map((email) => ({
          ...email,
          id: Date.now() + Math.random(), 
          revisado: false,
          starred: false,
        })),
        ...prev, 
      ]);
    }
    const line = getStoryline();
    if (!line) return;
    const nextIndex = line.findIndex((stepObj) => stepObj.id === option.nextStep);
    if (nextIndex >= 0) {
      setCurrentStepIndex(nextIndex);
      setSelectedEmail(null);
      // Detecta si el próximo paso es el final
      if (line[nextIndex].id === "end") {
        handleFinalOutcome();
      }
    } else {
      alert("You've reached an ending (or the next step was not found).");
      setSelectedEmail(null);
    }
  };
  

  function clamp(value, min, max) {
    return Math.max(min, Math.min(value, max));
  }

  const currentStep = getCurrentStep();

  const handleEmailClickSocial = (email) => {
    setSocialPool((prev) =>
      prev.map((m) => (m.id === email.id ? { ...m, revisado: true } : m))
    );
    setSelectedEmailSocial(email);
  };
  const handleToggleStarSocial = (emailId) => {
    setSocialPool((prev) =>
      prev.map((em) => (em.id === emailId ? { ...em, starred: !em.starred } : em))
    );
  };

  const handleEmailClickPromo = (email) => {
    setPromotionsPool((prev) =>
      prev.map((m) => (m.id === email.id ? { ...m, revisado: true } : m))
    );
    setSelectedEmailPromo(email);
  };
  const handleToggleStarPromo = (emailId) => {
    setPromotionsPool((prev) =>
      prev.map((em) => (em.id === emailId ? { ...em, starred: !em.starred } : em))
    );
  };

  const getAllStarredEmails = () => {
    const socialStarred = socialPool.filter((em) => em.starred);
    const promoStarred = promotionsPool.filter((em) => em.starred);
    return [...socialStarred, ...promoStarred];
  };

  const handleEmailClickStarred = (email) => {
    setSelectedEmailStarred(email);
  };

  const handleToggleStarGeneric = (emailId) => {
    if (socialPool.some((em) => em.id === emailId)) {
      handleToggleStarSocial(emailId);
    } else if (promotionsPool.some((em) => em.id === emailId)) {
      handleToggleStarPromo(emailId);
    }
  };
 // Inside your App component

const resetGame = () => {
  setCredibilidad(100);
  setPolarizacion(50);
  setEconomia(70);
  setActiveList("principal");
  setShowComposePopup(false);
  setComposeText("");
  setShowErrorPopup(false);
  setErrorMessage("");
  setCurrentLine(null);
  setCurrentStepIndex(null);
  setUsedSteps([]);
  setSelectedEmail(null);
  setSocialPool(initialSocialPool);
  setSelectedEmailSocial(null);
  setPromotionsPool(initialPromotionsPool);
  setSelectedEmailPromo(null);
  setSelectedEmailStarred(null);
  setPopupMessage("");
  setShowPopup(false);
  setGlitchActive(false);
  setShowStartMenu(true);
  setShowOptionsMenu(false);
  setVolume(50);
  setIsMuted(false);
  setShowMenu(false);
  setMusicVolume(50);
  setSfxVolume(50);
  setIsMusicMuted(false);
  setIsSfxMuted(false);
  setShowTutorial(true);
  setIsVisible(false);
  setMessage("");
  
  // Pause and reset any playing audio
  if (clickAudioRef.current) {
    clickAudioRef.current.pause();
    clickAudioRef.current.currentTime = 0;
  }
  if (audioErrorRef.current) {
    audioErrorRef.current.pause();
    audioErrorRef.current.currentTime = 0;
  }
  if (importantAudioRef.current) {
    importantAudioRef.current.pause();
    importantAudioRef.current.currentTime = 0;
  }
  if (newAudioMail.current) {
    newAudioMail.current.pause();
    newAudioMail.current.currentTime = 0;
  }
};

  let starredEmails = [];
  if (activeList === "starred") {
    starredEmails = getAllStarredEmails();
  }
 if (showStartMenu && !showOptionsMenu) {
    return (
      <div className="app-container">
        <StartMenu onStartGame={handleStartGame} onOptions={handleShowOptions} />
      </div>
    );
  }

  // =============================
  // Render condicional del Menú de Opciones
  // =============================
  if (showOptionsMenu) {
    return (
      <div className="app-container">
<Options
  // Música
  volume={musicVolume}
  isMuted={isMusicMuted}
  onVolumeChange={(e) => setMusicVolume(Number(e.target.value))}
  onMuteToggle={() => setIsMusicMuted((prev) => !prev)}

  // Efectos de sonido
  sfxVolume={sfxVolume}
  isSfxMuted={isSfxMuted}
  onSfxVolumeChange={(e) => setSfxVolume(Number(e.target.value))}
  onSfxMuteToggle={() => setIsSfxMuted((prev) => !prev)}

  // Cerrar menú
  onClose={handleCloseOptions}
/>
      </div>
    );
  }
  return (
    <div>
      <div className={`glitch-container ${glitchActive ? "glitch-active" : ""}`}>
        <div className="glitch-overlay"></div>
        <div className="glitch-overlay"></div>
        <div className="glitch-overlay"></div>
      </div>
     {isVisible && (
        <div className="important-message">
          <div className="important-message-content">
            <p>{message}</p>
            <button className="close-button" onClick={closeImportantMessage}>
              Close
            </button>
          </div>
        </div>
      )}
{brokenScreenActive && (
  <div
    className="broken-screen-overlay"
    style={{
      backgroundImage: `url(${Broken})`, // Asegura que se use la imagen correcta
    }}
  ></div>
)}

      {showComposePopup && (
        <PopupWindow95 title="Compose" onClose={handleCloseCompose}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <textarea
              style={{ width: "300px", height: "150px" }}
              value={composeText}
              onChange={(e) => setComposeText(e.target.value)}
              placeholder="Write your email here..."
            />
            <div style={{ marginTop: "0.5rem" }}>
              <button onClick={handleSendCompose}>Send</button>
              <button onClick={handleCloseCompose}>Close</button>
            </div>
          </div>
        </PopupWindow95>
      )}
      {showErrorPopup && (
        <PopupWindow95 title="Error" onClose={handleCloseError}>
          <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
          <button onClick={handleCloseError}>Close</button>
        </PopupWindow95>
      )}
    {showPopup && (
      <PopupWindow95 title="Notice" onClose={handleClosePopup}>
        <p>{popupMessage}</p>
        <button onClick={handleClosePopup}>Close</button>
      </PopupWindow95>
    )}
          <div className="ligthsOut"></div>
      <div className="gmail-container">
        <header className="header">
          <div className="header-left">
            <button className="hamburger">&#9776;</button>
            <img src="gmail-logo.png" alt="Gmail" className="logo" />
          </div>
          <div className="header-center">
            <input type="text" placeholder="Search in emails" />
          </div>
          <div className="header-right">
            <button className="apps" onClick={() => alert("Open 'Apps' (mocked)")}>
              🔳
            </button>
            <button className="profile" onClick={() => alert("View profile (mocked)")}>
              👤
            </button>
          </div>
        </header>
        <Indicators
          credibilidad={credibilidad}
          polarizacion={polarizacion}
          economia={economia}
        />
        <div className="content">
        <Sidebar
            economy={economia}
            credibility={credibilidad}
            polarization={polarizacion}
            onCompose={() => setShowComposePopup(true)}
            onShowError={() => {
              setErrorMessage("Mock error");
              setShowErrorPopup(true);
            }}
            onShowStarred={() => setActiveList("starred")}
            isMusicMuted={isMusicMuted}
            musicVolume={musicVolume}
            isTutorialActive={showTutorial} // Pass the tutorial state
          />
          <main className="email-section">
          <Tabs
            activeList={activeList}
            setActiveList={setActiveList}
            socialPool={socialPool} 
            promotionsPool={promotionsPool} 
          />
            {activeList === "principal" && (
              <div>
                <h2>Main Line</h2>
                <div className="email-list">
                  {currentStep && (
                    <div
                      className="email-item"
                      onClick={() => setSelectedEmail(currentStep)}
                      style={{ marginBottom: "1rem" }}
                    >
                      <span className="subject">{currentStep.subject}</span>
                      <span className="snippet">{currentStep.snippet}</span>
                    </div>
                  )}
                </div>
                <h2>History (Used Steps)</h2>
                <EmailListUsados emails={usedSteps} />
              </div>
            )}
            {activeList === "social" && (
              <>
                <h2>Social Emails</h2>
                <EmailListSocial
                  emails={socialPool}
                  onEmailClick={handleEmailClickSocial}
                  onToggleStar={handleToggleStarSocial}
                />
              </>
            )}
            {activeList === "promotions" && (
              <>
                <h2>Promotions</h2>
                <EmailListPromotions
                  emails={promotionsPool}
                  onEmailClick={handleEmailClickPromo}
                  onToggleStar={handleToggleStarPromo}
                />
              </>
            )}
            {activeList === "starred" && (
              <>
                <h2>Starred</h2>
                <EmailListStarred
                  emails={starredEmails}
                  onEmailClick={handleEmailClickStarred}
                  onToggleStar={handleToggleStarGeneric}
                />
              </>
            )}
          </main>
          <EmailViewer
            email={
              activeList === "principal"
                ? selectedEmail
                : activeList === "social"
                ? selectedEmailSocial
                : activeList === "promotions"
                ? selectedEmailPromo
                : activeList === "starred"
                ? selectedEmailStarred
                : null
            }
            handleIntroDecision={(line) => {
              if (selectedEmail?.id === "intro") {
                handleIntroDecision(line);
              }
            }}
            handleDecision={(option) => {
              if (!selectedEmail) return;
              if (selectedEmail.id === "intro") {
              } else {
                handleLineDecision(option);
              }
            }}
            goBack={() => {
              if (activeList === "principal") setSelectedEmail(null);
              else if (activeList === "social") setSelectedEmailSocial(null);
              else if (activeList === "promotions") setSelectedEmailPromo(null);
              else if (activeList === "starred") setSelectedEmailStarred(null);
            }}
          />
          <WeatherClockLocation />
        </div>
      </div>
    </div>
  );
}

export default App;
