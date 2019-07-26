var res = {
    BackGround_HomePage: "res/Resources/ipad/common/backgrounds/background_fullbleed/computer_background.png",
    Quiz_Time: "res/Resources/ipad/common/chrome/buttons/quiz_time_button.png",
    Tile_Match_The_Shadow: "res/Resources/ipad/common/tiles/playground_match_the_shadow.png",
    Tile_Archery_Activity: "res/Resources/ipad/common/tiles/tile_activity_archery.png",
    Tile_Basketball_Activity: "res/Resources/ipad/common/tiles/tile_activity_basketball.png",
    Tile_Car_Assembly_Activity: "res/Resources/ipad/common/tiles/tile_activity_car_assembling.png",
    Tile_HurdleJump_Activity: "res/Resources/ipad/common/tiles/tile_activity_hurdle_jump.png",
    Tile_RushLanes_Activity: "res/Resources/ipad/common/tiles/tile_activity_elephant.png",
    Back_Button : "res/Resources/ipad/common/chrome/buttons/home_button_4.png",
    BackGround_Match_The_Shadow: "res/Resources/ipad/common/backgrounds/background_fullbleed/background_wood_7.png",
    BackGround_Fill_The_Color: "res/Resources/ipad/common/backgrounds/background_fullbleed/color_background.png",
    CarPartsJson_1: "res/Resources/json/activities/vehicle_parts/vehicle_parts_set1.json",
    chrome_c_panel: "res/Resources/ipad/common/chrome/quiz/c_panel.png",
    hurdle_set1_x_large: "res/Resources/json/objectMeta/hurdle_set1_x_large.json",
    car_set1_x_large: "res/Resources/json/objectMeta/car_set1_x_large.json",
    replayButtonUri: "res/Resources/ipad/StoryApps/SwooshTime/chrome/button/button_replay.png"
};

// number_set29_large
for(var n = 0; n < 10; n++)
{
    res['number_set29_large_' + n] = "res/Resources/ipad/common/numbers/number_set29/number_set29_large/number_set29_large_" + n + ".png";
};

var archeryAssets = {
    asset_score_bg : "res/Resources/ipad/common/chrome/quiz/scoreboard_archery.png"
};

var audioRes = {
    effect_whoosh: "res/Resources/audio_mid/common/chrome/effects/effect_whoosh.mp3",
    effect_drop: "res/Resources/audio_mid/common/chrome/effects/effect_drop.mp3",
    star_pop_out_1: "res/Resources/audio_mid/JigsawGames/star_pop_out_1.mp3",
    fruit_apple: "res/Resources/audio_mid/common/fruits/fruits_basic/fruit_apple.mp3",
    fruit_apricot: "res/Resources/audio_mid/common/fruits/fruits_basic/fruit_apricot.mp3",
    fruit_avocado: "res/Resources/audio_mid/common/fruits/fruits_basic/fruit_avocado.mp3",
    effect_coin_sound: "res/Resources/audio_mid/JigsawGames/coin_sound.mp3",
    effect_object_moving: "res/Resources/audio_mid/common/chrome/effects/effect_object_moving.mp3",
    word_ball: "res/Resources/audio_mid/common/words/word_singular/word_ball.mp3",
    animal_dog: "res/Resources/audio_mid/common/animals/animals_basic/animal_dog.mp3",
    effect_car_horn: "res/Resources/audio_mid/common/chrome/effects/effect_car_horn.mp3",
    animal_elephant: "res/Resources/audio_mid/common/animals/animals_basic/animal_elephant.mp3"
};

// alphabets and phonics audio
for(var n = 0; n < 26; n++)
{
    var chr = String.fromCharCode(97 + n); // where n is 0, 1, 2 ...
    audioRes['alphabet_' + chr] = "res/Resources/audio_mid/common/alphabets/alphabet_simple/alphabet_" + chr + ".mp3";
    audioRes['alphabet_phonic_' + chr] = "res/Resources/audio_mid/common/alphabets/alphabet_phonics/alphabet_phonic_" + chr + ".mp3";
};



var numberSet29Large = [];
// number_set29_large
for(var n = 0; n < 10; n++)
{
    numberSet29Large['number_set29_large_' + n] = "res/Resources/ipad/common/numbers/number_set29/number_set29_large/number_set29_large_" + n + ".png";
};

var alphabetsRes = [];
var alphabetPhonicsRes = [];
// alphabets and phonics audio
for(var n = 0; n < 26; n++)
{
    var chr = String.fromCharCode(97 + n); // where n is 0, 1, 2 ...
    alphabetsRes['alphabet_' + chr] = "res/Resources/audio_mid/common/alphabets/alphabet_simple/alphabet_" + chr + ".mp3";
    alphabetPhonicsRes['alphabet_phonic_' + chr] = "res/Resources/audio_mid/common/alphabets/alphabet_phonics/alphabet_phonic_" + chr + ".mp3";
};


// Archery Activity Assets

var archeryActivity_Res = {
    Tile_Archery_Activity: "res/Resources/ipad/common/tiles/tile_activity_archery.png",
    Back_Button : "res/Resources/ipad/common/chrome/buttons/home_button_4.png",
    asset_score_bg : "res/Resources/ipad/common/chrome/quiz/scoreboard_archery.png",

    
    effect_whoosh: "res/Resources/audio_mid/common/chrome/effects/effect_whoosh.mp3",
    effect_drop: "res/Resources/audio_mid/common/chrome/effects/effect_drop.mp3",
    star_pop_out_1: "res/Resources/audio_mid/JigsawGames/star_pop_out_1.mp3",
    fruit_apple: "res/Resources/audio_mid/common/fruits/fruits_basic/fruit_apple.mp3",
    fruit_apricot: "res/Resources/audio_mid/common/fruits/fruits_basic/fruit_apricot.mp3",
    fruit_avocado: "res/Resources/audio_mid/common/fruits/fruits_basic/fruit_avocado.mp3",
    alphabet_a: "res/Resources/audio_mid/common/alphabets/alphabet_simple/alphabet_a.mp3",
    alphabet_phonic_a: "res/Resources/audio_mid/common/alphabets/alphabet_phonics/alphabet_phonic_a.mp3",
};

var archery_Res = [];
for (var i in archeryActivity_Res) {
    archery_Res.push(archeryActivity_Res[i]);
};

for (var i in numberSet29Large) {
    archery_Res.push(numberSet29Large[i]);
};



// Basketball Activity Assets

var basketballRes = {    
    asset_basketball_scoreboard: "res/Resources/ipad/common/chrome/quiz/basketball_scoreboard.png",
    asset_basket: "res/Resources/ipad/common/chrome/quiz/basketball_basket.png",
    asset_scoreboard: "res/Resources/ipad/common/chrome/quiz/basketball_scoreboard.png",
    Back_Button : "res/Resources/ipad/common/chrome/buttons/home_button_4.png",

    
    effect_coin_sound: "res/Resources/audio_mid/JigsawGames/coin_sound.mp3",
    effect_object_moving: "res/Resources/audio_mid/common/chrome/effects/effect_object_moving.mp3",
    word_ball: "res/Resources/audio_mid/common/words/word_singular/word_ball.mp3",
    alphabet_b: "res/Resources/audio_mid/common/alphabets/alphabet_simple/alphabet_b.mp3",
    alphabet_phonic_b: "res/Resources/audio_mid/common/alphabets/alphabet_phonics/alphabet_phonic_b.mp3",
};
    
var basketball_Res = [];
for (var i in basketballRes) {
    basketball_Res.push(basketballRes[i]);
};



// Car Assembly Activity Assets

var carActivityAssets = {
    Background_Car_1: "res/Resources/ipad/common/backgrounds/background_fullbleed/background_car_garage_2.png",
    Back_Button : "res/Resources/ipad/common/chrome/buttons/home_button_4.png",
    CarPartsJson_1: "res/Resources/json/activities/vehicle_parts/vehicle_parts_set1.json",
    chrome_c_panel: "res/Resources/ipad/common/chrome/quiz/c_panel.png",


    car1_back_light_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set1/vehicle_parts_set1_back_light.png",
    car1_body: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set1/vehicle_parts_set1_car_body.png",
    car1_back_shadow: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set1/vehicle_parts_set1_car_shadow.png",
    car1_head_light_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set1/vehicle_parts_set1_head_light_1.png",
    car1_head_light_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set1/vehicle_parts_set1_head_light_2.png",
    car1_head_light_3: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set1/vehicle_parts_set1_head_light_3.png",
    car1_pattern_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set1/vehicle_parts_set1_pattern_1.png",
    car1_pattern_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set1/vehicle_parts_set1_pattern_2.png",
    car1_roof_light_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set1/vehicle_parts_set1_roof_light_1.png",
    car1_roof_light_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set1/vehicle_parts_set1_roof_light_2.png",
    car1_tyre: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set1/vehicle_parts_set1_tire.png",
    car1_window_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set1/vehicle_parts_set1_window_1.png",
    car1_window_1_ping: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set1/vehicle_parts_set1_window_1_ping.png",
    car1_window_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set1/vehicle_parts_set1_window_2.png",

    car2_back_light_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set2/vehicle_parts_set2_back_light.png",
    car2_body: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set2/vehicle_parts_set2_car_body.png",
    car2_shadow: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set2/vehicle_parts_set2_car_shadow.png",
    car2_head_light_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set2/vehicle_parts_set2_head_light_1.png",
    car2_back_light_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set2/vehicle_parts_set2_head_light_2.png",
    car2_back_light_3: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set2/vehicle_parts_set2_head_light_3.png",
    car2_tyre: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set2/vehicle_parts_set2_tire.png",
    car2_window_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set2/vehicle_parts_set2_window_1.png",
    car2_window_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set2/vehicle_parts_set2_window_2.png",

    car3_back_light: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set3/vehicle_parts_set3_back_light.png",
    car3_body: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set3/vehicle_parts_set3_car_body.png",
    car3_shadow: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set3/vehicle_parts_set3_car_shadow.png",
    car3_smile: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set3/vehicle_parts_set3_car_smile.png",
    car3_head_light_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set3/vehicle_parts_set3_head_light_1.png",
    car3_head_light_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set3/vehicle_parts_set3_head_light_2.png",
    car3_head_light_3: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set3/vehicle_parts_set3_head_light_3.png",
    car3_tailpipe: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set3/vehicle_parts_set3_tailpipe.png",
    car3_tyre: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set3/vehicle_parts_set3_tire.png",
    car3_window_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set3/vehicle_parts_set3_window_1.png",
    car3_window_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set3/vehicle_parts_set3_window_2.png",
    car3_window_3: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set3/vehicle_parts_set3_window_3.png",

    vehicle_parts_set4_back_light: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set4/vehicle_parts_set4_back_light.png",
    vehicle_parts_set4_car_body: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set4/vehicle_parts_set4_car_body.png",
    vehicle_parts_set4_car_shadow: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set4/vehicle_parts_set4_car_shadow.png",
    vehicle_parts_set4_car_smile: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set4/vehicle_parts_set4_car_smile.png",
    vehicle_parts_set4_head_light_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set4/vehicle_parts_set4_head_light_1.png",
    vehicle_parts_set4_head_light_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set4/vehicle_parts_set4_head_light_2.png",
    vehicle_parts_set4_head_light_3: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set4/vehicle_parts_set4_head_light_3.png",
    vehicle_parts_set4_tire: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set4/vehicle_parts_set4_tire.png",
    vehicle_parts_set4_window_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set4/vehicle_parts_set4_window_1.png",
    vehicle_parts_set4_window_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set4/vehicle_parts_set4_window_2.png",

    vehicle_parts_set5_back_light: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set5/vehicle_parts_set5_back_light.png",
    vehicle_parts_set5_car_body: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set5/vehicle_parts_set5_car_body.png",
    vehicle_parts_set5_car_shadow: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set5/vehicle_parts_set5_car_shadow.png",
    vehicle_parts_set5_car_smile: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set5/vehicle_parts_set5_car_smile.png",
    vehicle_parts_set5_head_light_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set5/vehicle_parts_set5_head_light_1.png",
    vehicle_parts_set5_head_light_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set5/vehicle_parts_set5_head_light_2.png",
    vehicle_parts_set5_tire: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set5/vehicle_parts_set5_tire.png",
    vehicle_parts_set5_window_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set5/vehicle_parts_set5_window_1.png",
    vehicle_parts_set5_window_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set5/vehicle_parts_set5_window_2.png",
    vehicle_parts_set5_window_3: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set5/vehicle_parts_set5_window_3.png",
    vehicle_parts_set5_window_3_ping: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set5/vehicle_parts_set5_window_3_ping.png",

    vehicle_parts_set6_back_light_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set6/vehicle_parts_set6_back_light_1.png",
    vehicle_parts_set6_back_light_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set6/vehicle_parts_set6_back_light_2.png",
    vehicle_parts_set6_car_body: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set6/vehicle_parts_set6_car_body.png",
    vehicle_parts_set6_car_shadow: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set6/vehicle_parts_set6_car_shadow.png",
    vehicle_parts_set6_car_smile: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set6/vehicle_parts_set6_car_smile.png",
    vehicle_parts_set6_head_light_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set6/vehicle_parts_set6_head_light_1.png",
    vehicle_parts_set6_head_light_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set6/vehicle_parts_set6_head_light_2.png",
    vehicle_parts_set6_head_light_3: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set6/vehicle_parts_set6_head_light_3.png",
    vehicle_parts_set6_pattern_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set6/vehicle_parts_set6_pattern_1.png",
    vehicle_parts_set6_pattern_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set6/vehicle_parts_set6_pattern_2.png",
    vehicle_parts_set6_tire: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set6/vehicle_parts_set6_tire.png",
    vehicle_parts_set6_window_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set6/vehicle_parts_set6_window_1.png",
    vehicle_parts_set6_window_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set6/vehicle_parts_set6_window_2.png",

    vehicle_parts_set7_back_light_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set7/vehicle_parts_set7_back_light_1.png",
    vehicle_parts_set7_back_light_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set7/vehicle_parts_set7_back_light_2.png",
    vehicle_parts_set7_car_body: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set7/vehicle_parts_set7_car_body.png",
    vehicle_parts_set7_car_shadow: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set7/vehicle_parts_set7_car_shadow.png",
    vehicle_parts_set7_head_light_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set7/vehicle_parts_set7_head_light_1.png",
    vehicle_parts_set7_head_light_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set7/vehicle_parts_set7_head_light_2.png",
    vehicle_parts_set7_head_light_3: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set7/vehicle_parts_set7_head_light_3.png",
    vehicle_parts_set7_ping: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set7/vehicle_parts_set7_ping.png",
    vehicle_parts_set7_seat_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set7/vehicle_parts_set7_seat_1.png",
    vehicle_parts_set7_seat_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set7/vehicle_parts_set7_seat_2.png",
    vehicle_parts_set7_tire: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set7/vehicle_parts_set7_tire.png",
    vehicle_parts_set7_windshield: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set7/vehicle_parts_set7_windshield.png",

    vehicle_parts_set8_car_body: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set8/vehicle_parts_set8_car_body.png",
    vehicle_parts_set8_car_shadow: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set8/vehicle_parts_set8_car_shadow.png",
    vehicle_parts_set8_car_smile: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set8/vehicle_parts_set8_car_smile.png",
    vehicle_parts_set8_head_light_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set8/vehicle_parts_set8_head_light_1.png",
    vehicle_parts_set8_head_light_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set8/vehicle_parts_set8_head_light_2.png",
    vehicle_parts_set8_head_light_3: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set8/vehicle_parts_set8_head_light_3.png",
    vehicle_parts_set8_tailpipe: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set8/vehicle_parts_set8_tailpipe.png",
    vehicle_parts_set8_tire: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set8/vehicle_parts_set8_tire.png",
    vehicle_parts_set8_window_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set8/vehicle_parts_set8_window_1.png",
    vehicle_parts_set8_window_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set8/vehicle_parts_set8_window_2.png",
    vehicle_parts_set8_window_2_ping: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set8/vehicle_parts_set8_window_2_ping.png",

    car9_back_light_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set9/vehicle_parts_set9_back_light_1.png",
    car9_back_light_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set9/vehicle_parts_set9_back_light_2.png",
    car9_body: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set9/vehicle_parts_set9_car_body.png",
    car9_shadow: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set9/vehicle_parts_set9_car_shadow.png",
    car9_smile: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set9/vehicle_parts_set9_car_smile.png",
    car9_light_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set9/vehicle_parts_set9_head_light_1.png",
    car9_light_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set9/vehicle_parts_set9_head_light_2.png",
    car9_light_3: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set9/vehicle_parts_set9_head_light_3.png",
    car9_tire: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set9/vehicle_parts_set9_tire.png",
    car9_window: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set9/vehicle_parts_set9_window_1.png",

    vehicle_parts_set10_car_bonnet_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set10/vehicle_parts_set10_car_bonnet_1.png",
    vehicle_parts_set10_car_bonnet_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set10/vehicle_parts_set10_car_bonnet_2.png",
    vehicle_parts_set10_car_shadow: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set10/vehicle_parts_set10_car_shadow.png",
    vehicle_parts_set10_element_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set10/vehicle_parts_set10_element_1.png",
    vehicle_parts_set10_element_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set10/vehicle_parts_set10_element_2.png",
    vehicle_parts_set10_element_3: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set10/vehicle_parts_set10_element_3.png",
    vehicle_parts_set10_element_4: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set10/vehicle_parts_set10_element_4.png",
    vehicle_parts_set10_element_5: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set10/vehicle_parts_set10_element_5.png",
    vehicle_parts_set10_element_6: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set10/vehicle_parts_set10_element_6.png",
    vehicle_parts_set10_element_7: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set10/vehicle_parts_set10_element_7.png",
    vehicle_parts_set10_ping_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set10/vehicle_parts_set10_ping_1.png",
    vehicle_parts_set10_ping_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set10/vehicle_parts_set10_ping_2.png",
    vehicle_parts_set10_tire: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set10/vehicle_parts_set10_tire.png",

    vehicle_parts_set11_car_bonnet_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set11/vehicle_parts_set11_car_bonnet_1.png",
    vehicle_parts_set11_car_bonnet_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set11/vehicle_parts_set11_car_bonnet_2.png",
    vehicle_parts_set11_car_mudguard: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set11/vehicle_parts_set11_car_mudguard.png",
    vehicle_parts_set11_element_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set11/vehicle_parts_set11_element_1.png",
    vehicle_parts_set11_element_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set11/vehicle_parts_set11_element_2.png",
    vehicle_parts_set11_element_3: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set11/vehicle_parts_set11_element_3.png",
    vehicle_parts_set11_element_4: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set11/vehicle_parts_set11_element_4.png",
    vehicle_parts_set11_element_5: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set11/vehicle_parts_set11_element_5.png",
    vehicle_parts_set11_tire: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set11/vehicle_parts_set11_tire.png",
    vehicle_parts_set11_window_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set11/vehicle_parts_set11_window_1.png",
    vehicle_parts_set11_window_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set11/vehicle_parts_set11_window_2.png",

    vehicle_parts_set12_car_light_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set12/vehicle_parts_set12_car_light_1.png",
    vehicle_parts_set12_car_light_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set12/vehicle_parts_set12_car_light_2.png",
    vehicle_parts_set12_car_seat: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set12/vehicle_parts_set12_car_seat.png",
    vehicle_parts_set12_element_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set12/vehicle_parts_set12_element_1.png",
    vehicle_parts_set12_element_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set12/vehicle_parts_set12_element_2.png",
    vehicle_parts_set12_element_3: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set12/vehicle_parts_set12_element_3.png",
    vehicle_parts_set12_element_4: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set12/vehicle_parts_set12_element_4.png",
    vehicle_parts_set12_element_5: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set12/vehicle_parts_set12_element_5.png",
    vehicle_parts_set12_tire: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set12/vehicle_parts_set12_tire.png",

    vehicle_parts_set13_car_bonnet_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set13/vehicle_parts_set13_car_bonnet_1.png",
    vehicle_parts_set13_element_: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set13/vehicle_parts_set13_element_.png",
    vehicle_parts_set13_element_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set13/vehicle_parts_set13_element_1.png",
    vehicle_parts_set13_element_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set13/vehicle_parts_set13_element_2.png",
    vehicle_parts_set13_element_3: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set13/vehicle_parts_set13_element_3.png",
    vehicle_parts_set13_element_4: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set13/vehicle_parts_set13_element_4.png",
    vehicle_parts_set13_element_5: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set13/vehicle_parts_set13_element_5.png",
    vehicle_parts_set13_element_6: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set13/vehicle_parts_set13_element_6.png",
    vehicle_parts_set13_tire: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set13/vehicle_parts_set13_tire.png",
    
    vehicle_parts_set14_car_bonnet_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set14/vehicle_parts_set14_car_bonnet_1.png",
    vehicle_parts_set14_car_bonnet_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set14/vehicle_parts_set14_car_bonnet_2.png",
    vehicle_parts_set14_element_1: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set14/vehicle_parts_set14_element_1.png",
    vehicle_parts_set14_element_2: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set14/vehicle_parts_set14_element_2.png",
    vehicle_parts_set14_element_3: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set14/vehicle_parts_set14_element_3.png",
    vehicle_parts_set14_element_4: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set14/vehicle_parts_set14_element_4.png",
    vehicle_parts_set14_element_5: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set14/vehicle_parts_set14_element_5.png",
    vehicle_parts_set14_element_6: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set14/vehicle_parts_set14_element_6.png",
    vehicle_parts_set14_element_7: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set14/vehicle_parts_set14_element_7.png",
    vehicle_parts_set14_tire: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set14/vehicle_parts_set14_tire.png",

    vehicle_parts_set15_body: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set15/vehicle_parts_set15_body.png",
    vehicle_parts_set15_rocket_back_bumper: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set15/vehicle_parts_set15_rocket_back_bumper.png",
    vehicle_parts_set15_rocket_front_bumper: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set15/vehicle_parts_set15_rocket_front_bumper.png",
    vehicle_parts_set15_rocket_pannel: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set15/vehicle_parts_set15_rocket_pannel.png",
    vehicle_parts_set15_rocket_pannel_b: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set15/vehicle_parts_set15_rocket_pannel_b.png",
    vehicle_parts_set15_seat: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set15/vehicle_parts_set15_seat.png",
    vehicle_parts_set15_tires: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set15/vehicle_parts_set15_tires.png",
    vehicle_parts_set15_top_fender: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set15/vehicle_parts_set15_top_fender.png",

    vehicle_parts_set16_back_light: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set16/vehicle_parts_set16_back_light.png",
    vehicle_parts_set16_body: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set16/vehicle_parts_set16_body.png",
    vehicle_parts_set16_bumper: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set16/vehicle_parts_set16_bumper.png",
    vehicle_parts_set16_engine: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set16/vehicle_parts_set16_engine.png",
    vehicle_parts_set16_rocket_pannel: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set16/vehicle_parts_set16_rocket_pannel.png",
    vehicle_parts_set16_tires: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set16/vehicle_parts_set16_tires.png",
    vehicle_parts_set16_window: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set16/vehicle_parts_set16_window.png",
    
    vehicle_parts_set17_back_lights: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set17/vehicle_parts_set17_back_lights.png",
    vehicle_parts_set17_body: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set17/vehicle_parts_set17_body.png",
    vehicle_parts_set17_fender_a: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set17/vehicle_parts_set17_fender_a.png",
    vehicle_parts_set17_fender_b: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set17/vehicle_parts_set17_fender_b.png",
    vehicle_parts_set17_front_bumper: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set17/vehicle_parts_set17_front_bumper.png",
    vehicle_parts_set17_lights: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set17/vehicle_parts_set17_lights.png",
    vehicle_parts_set17_rocker_pannel: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set17/vehicle_parts_set17_rocker_pannel.png",
    vehicle_parts_set17_tires: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set17/vehicle_parts_set17_tires.png",
    vehicle_parts_set17_window_a: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set17/vehicle_parts_set17_window_a.png",
    vehicle_parts_set17_window_b: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set17/vehicle_parts_set17_window_b.png",

    vehicle_parts_set18_back_bumper: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set18/vehicle_parts_set18_back_bumper.png",
    vehicle_parts_set18_back_fender: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set18/vehicle_parts_set18_back_fender.png",
    vehicle_parts_set18_body: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set18/vehicle_parts_set18_body.png",
    vehicle_parts_set18_front_bumper: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set18/vehicle_parts_set18_front_bumper.png",
    vehicle_parts_set18_lights: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set18/vehicle_parts_set18_lights.png",
    vehicle_parts_set18_rocket_pannel_a: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set18/vehicle_parts_set18_rocket_pannel_a.png",
    vehicle_parts_set18_rocket_pannel_b: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set18/vehicle_parts_set18_rocket_pannel_b.png",
    vehicle_parts_set18_tires: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set18/vehicle_parts_set18_tires.png",
    vehicle_parts_set18_window: "res/Resources/ipad/common/vehicle_parts/vehicle_parts_set18/vehicle_parts_set18_window.png"
};

var carResAudio = {
    effect_car: "res/Resources/audio_mid/common/chrome/effects/effect_car.mp3",
    effect_sports_car: "res/Resources/audio_mid/common/chrome/effects/effect_sports_car.mp3",
    puzzle_piece_drop: "res/Resources/audio_mid/JigsawGames/puzzle_piece_drop.mp3",
    effect_tyre_fitting: "res/Resources/audio_mid/common/chrome/effects/effect_tyre_fitting.mp3",
    effect_car_burnoutHotRod: "res/Resources/audio_mid/common/chrome/effects/car_effects/burnoutHotRod.mp3",
    effect_car_by_2: "res/Resources/audio_mid/common/chrome/effects/car_effects/car_by_2.mp3",
    effect_car_peels_out: "res/Resources/audio_mid/common/chrome/effects/car_effects/car_peels_out.mp3",
    effect_car_roll_2: "res/Resources/audio_mid/common/chrome/effects/car_effects/car_roll_2.mp3",
    effect_car_start3: "res/Resources/audio_mid/common/chrome/effects/car_effects/car_start3.mp3",
    effect_civic_passing_at_high_speed: "res/Resources/audio_mid/common/chrome/effects/car_effects/civic_passing_at_high_speed.mp3",
    effect_corvette_pass: "res/Resources/audio_mid/common/chrome/effects/car_effects/corvette_pass.mp3",
    effect_ford_model_t: "res/Resources/audio_mid/common/chrome/effects/car_effects/ford_model_t.mp3",
    effect_formula_1: "res/Resources/audio_mid/common/chrome/effects/car_effects/formula_1.mp3",
    effect_gt40_taking_off: "res/Resources/audio_mid/common/chrome/effects/car_effects/gt40_taking_off.mp3",
    effect_car_lola2: "res/Resources/audio_mid/common/chrome/effects/car_effects/lola2.mp3",
    effect_passat_driveoff: "res/Resources/audio_mid/common/chrome/effects/car_effects/passat_driveoff.mp3",
    effect_porsche_2: "res/Resources/audio_mid/common/chrome/effects/car_effects/porsche_2.mp3",
    effect_r90s2_car_start: "res/Resources/audio_mid/common/chrome/effects/car_effects/r90s2_car_start.mp3",
    effect_trafficjam: "res/Resources/audio_mid/common/chrome/effects/car_effects/trafficjam.mp3"
};

    
var carActivity_Res = [];
for (var i in carActivityAssets) {
    carActivity_Res.push(carActivityAssets[i]);
};

for (var i in carResAudio) {
    carActivity_Res.push(carResAudio[i]);
};


var hurdleJumpRes = {
    asset_heart: "res/Resources/ipad/common/scenes/scene200/rws200_life_enable.png",
    asset_character: "res/Resources/ipad/common/scenes/scene200/rws200_dog_walking_frame_1.png",
    asset_scoreboard: "res/Resources/ipad/common/scenes/scene200/rws200_scoreboard.png",
    asset_bonusType_1: "res/Resources/ipad/common/scenes/scene200/rws200_dog_bone.png",
    asset_bonusType_2: "res/Resources/ipad/common/scenes/scene200/rws200_letter_d.png",
    asset_rws200_road: "res/Resources/ipad/common/scenes/scene200/rws200_road.png",
    assets_rws200_background_sky: "res/Resources/ipad/common/scenes/scene200/rws200_background_sky.png",
    asset_rws200_back_bush_1: "res/Resources/ipad/common/scenes/scene200/rws200_back_bush_1.png",
    asset_rws200_back_bush_1: "res/Resources/ipad/common/scenes/scene200/rws200_back_bush_2.png",
    asset_rws200_mountain_1: "res/Resources/ipad/common/scenes/scene200/rws200_mountain_1.png",
    asset_rws200_mountain_2: "res/Resources/ipad/common/scenes/scene200/rws200_mountain_2.png",
    asset_rws200_front_bush_1: "res/Resources/ipad/common/scenes/scene200/rws200_front_bush_1.png",
    asset_rws200_front_bush_2: "res/Resources/ipad/common/scenes/scene200/rws200_front_bush_2.png",
    sound_of_dog: "res/Resources/audio_mid/common/animals/animal_sounds/sound_dog.mp3",
    hurdle_set1_x_large_cactus_1: "res/Resources/ipad/common/chrome/hurdles/hurdle_set1_x_large/hurdle_set1_x_large_cactus_1.png",
    hurdle_set1_x_large_cactus_2: "res/Resources/ipad/common/chrome/hurdles/hurdle_set1_x_large/hurdle_set1_x_large_cactus_2.png",
    hurdle_set1_x_large_cactus_3: "res/Resources/ipad/common/chrome/hurdles/hurdle_set1_x_large/hurdle_set1_x_large_cactus_3.png",
    hurdle_set1_x_large_octagram_1: "res/Resources/ipad/common/chrome/hurdles/hurdle_set1_x_large/hurdle_set1_x_large_octagram_1.png",
    hurdle_set1_x_large_octagram_2: "res/Resources/ipad/common/chrome/hurdles/hurdle_set1_x_large/hurdle_set1_x_large_octagram_2.png",
    hurdle_set1_x_large_porcupine_1: "res/Resources/ipad/common/chrome/hurdles/hurdle_set1_x_large/hurdle_set1_x_large_porcupine_1.png",
    hurdle_set1_x_large_porcupine_2: "res/Resources/ipad/common/chrome/hurdles/hurdle_set1_x_large/hurdle_set1_x_large_porcupine_2.png",
    hurdle_set1_x_large_spiral_blade_1: "res/Resources/ipad/common/chrome/hurdles/hurdle_set1_x_large/hurdle_set1_x_large_spiral_blade_1.png",
    hurdle_set1_x_large_spiral_blade_2: "res/Resources/ipad/common/chrome/hurdles/hurdle_set1_x_large/hurdle_set1_x_large_spiral_blade_2.png",
    hurdle_set1_x_large_spiral_blade_3: "res/Resources/ipad/common/chrome/hurdles/hurdle_set1_x_large/hurdle_set1_x_large_spiral_blade_3.png",
    hurdle_set1_x_large_spiral_blade_4: "res/Resources/ipad/common/chrome/hurdles/hurdle_set1_x_large/hurdle_set1_x_large_spiral_blade_4.png",
    hurdle_set1_x_large_spiral_blade_5: "res/Resources/ipad/common/chrome/hurdles/hurdle_set1_x_large/hurdle_set1_x_large_spiral_blade_5.png",

    
    Back_Button: "res/Resources/ipad/common/chrome/buttons/home_button_4.png",
    hurdle_set1_x_large: "res/Resources/json/objectMeta/hurdle_set1_x_large.json",
    replayButtonUri: "res/Resources/ipad/StoryApps/SwooshTime/chrome/button/button_replay.png",
    
    animal_dog: "res/Resources/audio_mid/common/animals/animals_basic/animal_dog.mp3",
    alphabet_d: "res/Resources/audio_mid/common/alphabets/alphabet_simple/alphabet_d.mp3",
    alphabet_phonic_d: "res/Resources/audio_mid/common/alphabets/alphabet_phonics/alphabet_phonic_d.mp3",
    effect_drop: "res/Resources/audio_mid/common/chrome/effects/effect_drop.mp3",
};

var hurdleJump_Res = [];
for (var i in hurdleJumpRes) {
    hurdleJump_Res.push(hurdleJumpRes[i]);
};

for (var i in numberSet29Large) {
    hurdleJump_Res.push(numberSet29Large[i]);
};

var rushLanesRes = {
    asset_heart: "res/Resources/ipad/common/scenes/scene200/rws200_life_enable.png",
    asset_character: "res/Resources/ipad/common/chrome/quiz/walking_elephant_1.png",
    asset_scoreboard: "res/Resources/ipad/common/scenes/scene200/rws200_scoreboard.png",
    asset_bonusType_1: "res/Resources/ipad/common/chrome/quiz/sugarcane.png",
    asset_bonusType_2: "res/Resources/ipad/common/alphabets/alphabet_set1/alphabet_set1_e.png",
    sound_of_elephant: "res/Resources/audio_mid/common/animals/animal_sounds/sound_elephant.mp3",
    road_devider: "res/Resources/ipad/common/chrome/quiz/road_devider.png",
    car_set1_x_large_car1: "res/Resources/ipad/common/cars/car_set1_x_large/car_set1_x_large_car1.png",
    car_set1_x_large_car2: "res/Resources/ipad/common/cars/car_set1_x_large/car_set1_x_large_car2.png",
    car_set1_x_large_car3: "res/Resources/ipad/common/cars/car_set1_x_large/car_set1_x_large_car3.png",
    car_set1_x_large_car4: "res/Resources/ipad/common/cars/car_set1_x_large/car_set1_x_large_car4.png",
    car_set1_x_large_car5: "res/Resources/ipad/common/cars/car_set1_x_large/car_set1_x_large_car5.png",
    car_set1_x_large_car6: "res/Resources/ipad/common/cars/car_set1_x_large/car_set1_x_large_car6.png",
    car_set1_x_large_car7: "res/Resources/ipad/common/cars/car_set1_x_large/car_set1_x_large_car7.png",
    car_set1_x_large_car8: "res/Resources/ipad/common/cars/car_set1_x_large/car_set1_x_large_car8.png",
    car_set1_x_large_car9: "res/Resources/ipad/common/cars/car_set1_x_large/car_set1_x_large_car9.png",
    car_set1_x_large_car10: "res/Resources/ipad/common/cars/car_set1_x_large/car_set1_x_large_car10.png",
    car_set1_x_large_car11: "res/Resources/ipad/common/cars/car_set1_x_large/car_set1_x_large_car11.png",
    car_set1_x_large_car12: "res/Resources/ipad/common/cars/car_set1_x_large/car_set1_x_large_car12.png",
    treeImgUri: "res/Resources/ipad/common/chrome/quiz/tree_top_view.png",
    bgSoundUri: "res/Resources/audio_mid/common/music/casual/bensound_jazzyfrenchy.mp3",

    
    Back_Button: "res/Resources/ipad/common/chrome/buttons/home_button_4.png",
    car_set1_x_large: "res/Resources/json/objectMeta/car_set1_x_large.json",
    replayButtonUri: "res/Resources/ipad/StoryApps/SwooshTime/chrome/button/button_replay.png",
    
    effect_car_horn: "res/Resources/audio_mid/common/chrome/effects/effect_car_horn.mp3",
    animal_elephant: "res/Resources/audio_mid/common/animals/animals_basic/animal_elephant.mp3",
    alphabet_e: "res/Resources/audio_mid/common/alphabets/alphabet_simple/alphabet_e.mp3",
    alphabet_phonic_e: "res/Resources/audio_mid/common/alphabets/alphabet_phonics/alphabet_phonic_e.mp3",
    
}

var rushLanes_Res = [];
for (var i in rushLanesRes) {
    rushLanes_Res.push(rushLanesRes[i]);
};

for (var i in numberSet29Large) {
    rushLanes_Res.push(numberSet29Large[i]);
};




var runningFoxRes = {
    asset_scoreboard: "res/Resources/ipad/common/scenes/scene200/rws200_scoreboard.png",
    asset_background: "res/Resources/ipad/common/scenes/scene201/rws201_background_1_1.png",
    asset_background2: "res/Resources/ipad/common/scenes/scene201/rws201_background_1_2.png",
    asset_background3: "res/Resources/ipad/common/scenes/scene201/rws201_background_1_3.png",
    asset_background4: "res/Resources/ipad/common/scenes/scene201/rws201_background_1_4.png",

    asset_background_lower_1: "res/Resources/ipad/common/scenes/scene201/rws201_background_2_1.png",
    asset_background_lower_2: "res/Resources/ipad/common/scenes/scene201/rws201_background_2_2.png",
    asset_background_lower_3: "res/Resources/ipad/common/scenes/scene201/rws201_background_2_3.png",
    asset_background_lower_4: "res/Resources/ipad/common/scenes/scene201/rws201_background_2_4.png",
    
    asset_beehive_1: "res/Resources/ipad/common/scenes/scene201/rws201_beehive_1.png",
    asset_beehive_2: "res/Resources/ipad/common/scenes/scene201/rws201_beehive_2.png",
    asset_beehive_3: "res/Resources/ipad/common/scenes/scene201/rws201_beehive_3.png",
    asset_beehive_4: "res/Resources/ipad/common/scenes/scene201/rws201_beehive_4.png",
    asset_beehive_tree: "res/Resources/ipad/common/scenes/scene201/rws201_beehive_tree.png",

    asset_character: "res/Resources/ipad/common/scenes/scene201/rws201_fox_running_1.png",
    asset_character_2: "res/Resources/ipad/common/scenes/scene201/rws201_fox_running_2.png",
    asset_character_3: "res/Resources/ipad/common/scenes/scene201/rws201_fox_running_3.png",
    asset_character_standing: "res/Resources/ipad/common/scenes/scene201/rws201_fox_standing.png",
    
    asset_heart: "res/Resources/ipad/common/scenes/scene201/rws201_life_enable.png",
    asset_grape_wine: "res/Resources/ipad/common/scenes/scene201/rws201_grape_vine_without_grapes.png",
    asset_bonusType_1: "res/Resources/ipad/common/scenes/scene201/rws201_grape_2.png",
    asset_bonusType_2: "res/Resources/ipad/common/scenes/scene201/rws201_alphabet_f.png",
    
    asset_mango: "res/Resources/ipad/common/scenes/scene201/rws201_mango_1.png",
    asset_mango_tree: "res/Resources/ipad/common/scenes/scene201/rws201_mango_tree_without_mangoes.png",
    
    Back_Button: "res/Resources/ipad/common/chrome/buttons/home_button_4.png",
    replayButtonUri: "res/Resources/ipad/StoryApps/SwooshTime/chrome/button/button_replay.png",
    
    fruit_grapes: "res/Resources/audio_mid/common/fruits/fruits_basic_plural/fruit_grapes.mp3",
    animal_fox: "res/Resources/audio_mid/common/alphabets/alphabet_objects/alphabet_object_fox.mp3",
    alphabet_f: "res/Resources/audio_mid/common/alphabets/alphabet_simple/alphabet_f.mp3",
    alphabet_phonic_f: "res/Resources/audio_mid/common/alphabets/alphabet_phonics/alphabet_phonic_f.mp3",
    effect_drop: "res/Resources/audio_mid/common/chrome/effects/effect_drop.mp3",
    music_background: "res/Resources/audio_mid/common/music/casual/bensound_buddy.mp3",
};

var runningFox_Res = [];
for (var i in runningFoxRes) {
    runningFox_Res.push(runningFoxRes[i]);
};

for (var i in numberSet29Large) {
    runningFox_Res.push(numberSet29Large[i]);
};






var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
};

for (var i in archeryAssets) {
    g_resources.push(archeryAssets[i]);
};

    
for (var i in audioRes) {
    g_resources.push(audioRes[i]);
};

    
for (var i in carResAudio) {
    g_resources.push(carResAudio[i]);
};

    
for (var i in carActivityAssets) {
    g_resources.push(carActivityAssets[i]);
};

    
for (var i in basketballRes) {
    g_resources.push(basketballRes[i]);
};

    
for (var i in hurdleJumpRes) {
    g_resources.push(hurdleJumpRes[i]);
};

    
for (var i in rushLanesRes) {
    g_resources.push(rushLanesRes[i]);
};

    
for (var i in runningFoxRes) {
    g_resources.push(runningFoxRes[i]);
};
