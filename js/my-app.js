var myApp = new Framework7({
    pushState: true,
    // ... other parameters
});
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

var keyarray = [46,8,9,27,13,110,190];
function CheckNumericKey(keyCode, ctrlKey) {
    if(keyarray.indexOf(keyCode) != -1 ||
    	(keyCode == 65 && ctrlKey === true) ||
         // Allow: Ctrl+C
        (keyCode == 67 && ctrlKey === true) ||
         // Allow: Ctrl+X
        (keyCode == 88 && ctrlKey === true) ||
         // Allow: home, end, left, right
        (keyCode >= 35 && keyCode <= 39) ||
        (keyCode >= 48 && keyCode <= 57) ) {
             // let it happen, don't do anything
             return true;
    }
    else {
    	return false;
    }	
}

$$('input[type="number"]').on('keydown', function (e) {
    if(CheckNumericKey(e.keyCode,e.ctrlKey)){
		checkPossibleCalculation();
             return;
    }
    else {
    	e.preventDefault();
    	return false;
    }    
});

$$('input[type="number"]').on('keyup', function (e) { 
	checkPossibleCalculation();
});


$$('select').on('change', function () {
    checkPossibleCalculation(); // nothing
});

function updateBMI(BMI) {    
    $$('#BMI').text(topoint(BMI, 1));
}


function checkPossibleCalculation() {
    if ($$('#Height').val() != undefined && $$('#Height').val() != "" && $$('#Weight').val() != undefined && $$('#Weight').val() != "") {
        Height = Number($$('#Height').val());
        Weight = Number($$('#Weight').val());
        BMI = Weight * 10000 / (Height * Height);
        updateBMI(BMI);

        if ($$('#Age').val() != undefined && $$('#Age').val() != "" &&
            $$('#SBP').val() != undefined && $$('#SBP').val() != "" &&
            $$('#TC').val() != undefined && $$('#TC').val() != "" &&
            $$('#FSG').val() != undefined && $$('#FSG').val() != "") {
            Age = Number($$('#Age').val());

            SBP = Number($$('#SBP').val());
            if (SBP < 100)
                sbpindex = 0;
            else if (SBP >= 100 && SBP < 120)
                sbpindex = 1;
            else if (SBP >= 120 && SBP < 140)
                sbpindex = 2;
            else if (SBP >= 140 && SBP < 160)
                sbpindex = 3;
            else if (SBP >= 160)
                sbpindex = 4;

            TC = Number($$('#TC').val());
            if (TC >= 240)
                tcindex = 1;
            else
                tcindex = 0;


            FSG = Number($$('#FSG').val());
            if (FSG < 70)
                fsgindex = 0;
            else if (FSG >= 70 && FSG < 85)
                fsgindex = 1;
            else if (FSG >= 85 && FSG < 100)
                fsgindex = 2;
            else if (FSG >= 100 && FSG < 110)
                fsgindex = 3;
            else if (FSG >= 110)
                fsgindex = 4;

            if (BMI < 18.5)
                bmiindex = 0;
            else if (BMI >= 18.5 && BMI < 23)
                bmiindex = 1;
            else if (BMI >= 23 && BMI < 25)
                bmiindex = 2;
            else if (BMI >= 25 && BMI < 30)
                bmiindex = 3;
            else if (BMI >= 30)
                bmiindex = 4;


            gd = $$('#Gender').val();
            DMHistory = $$('#DMHistory').val();
            Alcoholintake = $$('#Alcoholintake').val();
            Smoking = $$('#Smoking').val();
            PhysicalActivity = $$('#PhysicalActivity').val();
            HTNagent = $$('#HTNagent').val();
            Statin = $$('#Statin').val();

            if (gd == 0) {
                age_coeff = Age * 0.03429806;
                DMHistory_Table = [0, 0.40539468];
                DMHistory_coeff = DMHistory_Table[DMHistory];

                Alcoholintake_Table = [-0.08385316,0.05447258];
                Alcoholintake_coeff = Alcoholintake_Table[Alcoholintake];

                Smoking_Table = [0, 0.06879353, 0.39075797];
                Smoking_coeff = Smoking_Table[Smoking];

                PhysicalActivity_Table = [0,-0.12335606,-0.13733219];
                PhysicalActivity_coeff = PhysicalActivity_Table[PhysicalActivity];

                HTNagent_Table = [0, 0.32880315];
                HTNagent_coeff = HTNagent_Table[HTNagent];

                Statin_Table = [0, 0.26482252];
                Statin_coeff = Statin_Table[Statin];

                BMI_Table = [0.07343423, 0, 0.33567685, 0.65489924, 1.25414597];
                BMI_coeff = BMI_Table[bmiindex];

                SBP_Table = [-0.12135365, 0, 0.15236789, 0.25680655, 0.34104001];
                SBP_coeff = SBP_Table[sbpindex];

                TC_table = [0, 0.17977916];
                TC_coeff = TC_table[tcindex];

                FSG_table = [-0.06092024, 0, 0.21862977, 0.69352537, 1.29451275];
                FSG_coeff = FSG_table[fsgindex];

                mean_PI = 1.755900;

                sum_coeff = age_coeff + DMHistory_coeff + Alcoholintake_coeff + Smoking_coeff + PhysicalActivity_coeff + HTNagent_coeff + Statin_coeff + BMI_coeff + SBP_coeff + TC_coeff + FSG_coeff;
                sp = (1- Math.pow(0.966054, Math.exp(sum_coeff - mean_PI))) * 100

                $$('#DiabetesEvent').text(topoint(sp,1) + "%");
            } else {
                if ($$('#GGT').val() != undefined && $$('#GGT').val() != "") {
                    GGT = Number($$('#GGT').val());

                    age_coeff = Age * 0.03267195;
                    DMHistory_Table = [0, 0.45270876];
                    DMHistory_coeff = DMHistory_Table[DMHistory];

                    Smoking_Table = [0, 0.23742451, 0.27228951];
                    Smoking_coeff = Smoking_Table[Smoking];

                    PhysicalActivity_Table = [0, -0.06736686, -0.02239017];
                    PhysicalActivity_coeff = PhysicalActivity_Table[PhysicalActivity];

                    HTNagent_Table = [0, 0.38249871];
                    HTNagent_coeff = HTNagent_Table[HTNagent];

                    Statin_Table = [0, 0.31324724];
                    Statin_coeff = Statin_Table[Statin];

                    BMI_Table = [0.01107232, 0, 0.32325289, 0.64505894, 1.06455937];
                    BMI_coeff = BMI_Table[bmiindex];

                    SBP_Table = [-0.17698000, 0, 0.18910012, 0.29230610, 0.36250700];
                    SBP_coeff = SBP_Table[sbpindex];

                    TC_table = [0, 0.10497807];
                    TC_coeff = TC_table[tcindex];

                    FSG_table = [-0.02473416, 0, 0.22737061, 0.78101158, 1.34396826];
                    FSG_coeff = FSG_table[fsgindex];

                    GGT_coeff = 0.48718396 * Math.log(GGT);

                    mean_PI = 3.079393;

                    sum_coeff = age_coeff + DMHistory_coeff + Smoking_coeff + PhysicalActivity_coeff + HTNagent_coeff + Statin_coeff + BMI_coeff + SBP_coeff + TC_coeff + FSG_coeff + GGT_coeff;
                    sp = (1 - Math.pow(0.974148, Math.exp(sum_coeff - mean_PI))) * 100

                    $$('#DiabetesEvent').text(topoint(sp, 1) + "%");

                }
                else {
                    $$('#DiabetesEvent').text("");
                }
            }
        }
        else {
            $$('#DiabetesEvent').text("");
        }
    }
    else
    {
        $$('#BMI').text("");
        $$('#DiabetesEvent').text("");
    }

    if($$('#SCr').val() != undefined && $$('#SCr').val() != "" && $$('#Age').val() != undefined && $$('#Age').val() != "") {
        gendertype = $$('#Gender').val();
        racetype = $$('#Race').val();
        scr = Number($$('#SCr').val());
        age = Number($$('#Age').val());

        ckdepionlycr(scr,age,gendertype,racetype);
        MDRD(scr,age,gendertype,racetype);
    }
    else
    {
        $$('#eGFRCr').text("");
        $$('#MDRD').text("");
    }
}

function ckdepionlycr(scr,age,gendertype,racetype){
    gk = Number(CreGFRgenderkvalue[gendertype]);
    ga = Number(CreGFRgenderavalue[gendertype]);
    fv = Number(CreGFRgenderfvalue[gendertype]);
    rv = Number(CreGFRracevalue[racetype]);
    eGFRCr = 141 * Math.pow(Math.min(scr/gk,1),ga) * Math.pow(Math.max(scr/gk,1),-1.209) * Math.pow(0.993,age) * fv * rv;
    $$('#eGFRCr').text(topoint(eGFRCr,1));
}

function MDRD(scr,age,gendertype,racetype){
    fv = Number(MDRDgenderfvalue[gendertype]);
    rv = Number(MDRDracevalue[racetype]);
    MDRDcr = 175 * Math.pow(scr,-1.154) * Math.pow(age,-0.203)*fv*rv;
    $$('#MDRD').text(topoint(MDRDcr,1));
}

function topoint(value, precision) {
    var power = Math.pow(10, precision || 0);
    return String(Math.round(value * power) / power);
}