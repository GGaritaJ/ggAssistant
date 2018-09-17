# ggAssistant
jQuery plugin ggAssistant v1.2
-developed by GGaritaJ: Gerardo Garita-

Plugin based on jquery to summarize the content on the screen with an pagination assistant (ex: step-by-step), allowing the fields validations on forms and improve navigation on the websites.

Usage:
```javascript
$("ul[assistant]").ggAssistant();//default
$("ul[assistant='assistantClass']").ggAssistant({
    startAt: 3,//start position
    disable: [1, 2],//start with disabled options
    hide: 4 //start with hidden options
});

//Some functions:
$("ul").Assistant().Refresh();

var pos = $("ul#topAssistant").Assistant().GetPosition();

$("#topAssistant,#bottomAssistant").Assistant().SetPosition(2);

$("ul[assistant]").Assistant().SetPosition(2, false);// false: fire event click in li tag, default its true

$("[assistant]").Assistant().Hide(3);//array works too: .Hide([2, 3, 4]);

$("ul.assistant").Assistant().Show(2);//array works too

$(".assistant").Assistant().Disable(4);//array works too

$(".assistant").Assistant().Enable(4);//array works too

$("ul.assistant").Assistant().History('all');// .History(3)//lastest 3
```

Online example: https://jsfiddle.net/GGaritaJ/j1Lunrqo/10/

More info: www.ggaritaj.com info@ggaritaj.com
