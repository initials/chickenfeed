
<?php
$links = file_get_contents('view_full.html');
echo $links;
?>

<?php
echo "<br>";
$homepage = file_get_contents('http://initialsgames.com/highscores/commands.php?f=getWorldWideTotal&gamename=feedingtime');
//echo $homepage;
//echo " chickens fed world wide";
?>


<?php
$links = file_get_contents('view_full_foot.html');
echo $links;
?>
