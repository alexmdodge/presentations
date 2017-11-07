<?php
  /*
   * Presentations Page
   * - - - - - - - - - -
   * This is a simple sub domain where all presentations and slides
   * are kept for tech shares and other events
   */
?>

<html>
  <head>
    <title> Presentations </title>
    <link href="./presentations.css" rel="stylesheet" type="text/css">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <link rel="icon" type="image/png" href="./favicon.png">
    <link href="https://fonts.googleapis.com/css?family=Space+Mono" rel="stylesheet">
  </head>

  <body class="main">
    <div class="splash">
      <h1 class="splash__title"> 
        <span class="splash__over-title">
          Presentations
        </span>
        <span class="splash__under-title">
          Presentations
        </span>
      </h1>
      <div class="splash__author"> by alex </div>
    </div>

    <?php include('./templates/presentations.php'); ?>

    <script src="./presentation.js"></script>
  </body>
</html>