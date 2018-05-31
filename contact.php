<?php
    // Message Vars
    $msg = '';
    $msgClass = '';

    // Check For Submit 
    if(filter_has_var(INPUT_POST, 'submit')){
        // Get Form Data
        $name = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $message = htmlspecialchars($_POST['message']);

        // Check Required Fields
        if(!empty($email) && !empty($name) && !empty($message)){
            // Passed
            // Check Email
            if(filter_var($email, FILTER_VALIDATE_EMAIL) === false){
                // Failed
                $msg = 'Please use a valid email';
                $msgClass = 'alert-danger';
            } else {
                // Passed
                $toEmail = 'info@alcanah.com';
                $subject = 'Contact Request From '.$name;
                $body = '<h2>Alcanah Contact Request</h2>
                    <h4>Name</h4><p>'.$name.'</p>
                    <h4>Email</h4><p>'.$email.'</p>
                    <h4>Message</h4><p>'.$message.'</p>
                ';

                // Email Headers
                $headers = "MIME-Version: 1.0" ."\r\n";
                $headers .="Content-Type:text/html;charset=UTF-8" . "\r\n";

                // Additional Headers
                $headers .= "From: " .$name. "<".$email.">". "\r\n";

                if(mail($toEmail, $subject, $body, $headers)){
                    // Email Sent
                    $msg = 'Your email has been sent';
                    $msgClass = 'alert-success';
                } else {
                    // Failed
                    $msg = 'Your email was not sent';
                    $msgClass = 'alert-danger';
                }
            }
        } else {
            // Failed
            $msg = 'Please fill in all fields';
            $msgClass = 'alert-danger';
        }
    }
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta name="robots" content="noodp" />
    <meta name="robots" content="noydir" />
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-114309142-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'UA-114309142-1');
    </script>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Natural Soap that nourishes the skin, with rich lather, clear pimples, soothes, maintains an uneven skin tone, Skin Moisturizer" />
    <meta name="keywords" content="African Zee Black Soap" />
    <meta http-equiv="cleartype" content="on" />
    <meta name="HandheldFriendly" content="True" />
    <meta name="MobileOptimized" content="320" />
    <meta property="og:url" content="www.alcanah.com/about.html" />
    <meta property="og:title" content="About us" />
    <meta property="og:type" content="about us Alcanah Limited" />
    <meta name="author" content="Alcanah Limited">
    <meta property="og:description" content="Visit the African Zee Black Soap page to find out how our Natural African Zee Black Soap offer more care than your average shower soap and enjoy ." />
    <link rel="canonical" href="https://www.alcanah.com/about.html" itemprop="url" />
    <meta name="description" content="About us Alcanah Limited, company that manufacture best top quality African Black Soap African Zee Black Soap, Needz Extra-luxury Soap with Shea Butter, Aloe vera and Raw Native Honey ingredients located in the city of Ibadan, Nigeria."
    />
    <meta http-equiv="content-language" content="en" />

    <link rel="shortcut icon" href="images/alca.png" type="image/x-icon" />
    <title>Contact us</title>

    
    <link rel="stylesheet" href="css/bootstrap.min.css" >
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/owl.theme.default.min.css">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link rel="stylesheet" href="css/simple-line-icons.css">
    <link rel="stylesheet" href="css/jquery.lightbox.min.css">
    <link rel="stylesheet" href="css/fontawesome-all.css">
    <link rel="stylesheet" href="cs/font-awesome.min.css">
    <link rel="stylesheet" href="cs/animate.css">
    <link rel="stylesheet" href="cs/bootsnav.css">
    <link rel="stylesheet" href="cs/swipebox.css">
    <link rel="stylesheet" href="cs/contact.css">
    <link rel="stylesheet" href="css/charity.css">
    <link rel="stylesheet" href="css/test.css">
    <link rel="stylesheet" href="cs/date.css">
    <link rel="stylesheet" href="c/clients.css">
    <link rel="stylesheet" href="css/styleme.css">
    <link rel="stylesheet" href="css/main.ae7f89948404cc811ee418d86d5fa383.css">
    <link rel="stylesheet" href="css/fontawesome-all.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <link href="//fonts.googleapis.com/css?family=Raleway:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&amp;subset=latin-ext" rel="stylesheet">
    <link href="//fonts.googleapis.com/css?family=Stylish&amp;subset=korean" rel="stylesheet">

    <style>
        .dropdown-submenu {
      position: relative;
      width: 100%;
    }

    .dropdown-submenu .dropright a::after {
      
      position: relative;
      right: 9px;
      left: .3rem;
      top: .0em;
      
      }

    .dropdown-submenu .dropdown-menu {
      width: 125%;
      top: 10%;
      left: 100%;
      margin-left: .1rem;
      margin-right: .1rem;
    }


    .dropdown-submenu>a:after{
      display:block;
      content:" ";
      float:right;
      width:0;
      height:0;
      border-color:transparent;
      border-style:solid;
      border-width:5px 0 5px 5px;
      border-left-color:#cccccc;
      margin-top:8px;
      margin-right:-8px;}
    .dropdown-submenu:hover>a:after{
      border-left-color:#555;
    }
    .dropdown-submenu.pull-left{
      float:none;
      }.dropdown-submenu.pull-left>.dropdown-menu{
      left:-100%;
      margin-left:10px;-webkit-border-radius:6px 0 6px 6px;-moz-border-radius:6px 0 6px 6px;border-radius:6px 0 6px 6px;}


        .block {
            margin: 20px;
            border-radius: 4px;
            width: 280px;
            min-height: 430px;
            background: #fff;
            padding: 23px;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            box-shadow: 0 2px 55px rgba(0, 0, 0, 0.1);
        }
        
        .top {
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 10px;
        }
        
        .top ul {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
        }
        
        .top a {
            color: #9e9e9e;
        }
        
        .top a:hover {
            color: #c7ccdb;
        }
        
        .converse {
            padding: 2px 10px;
            border-radius: 20px;
            text-transform: uppercase;
            font-size: 14px;
        }
        
        .middle {
            margin-bottom: 40px;
        }
        
        .middle img {
            width: 100%;
        }
        
        .bottom {
            text-align: center;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -ms-flex-direction: column;
            flex-direction: column;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
            -webkit-box-flex: 1;
            -ms-flex-positive: 1;
            flex-grow: 1;
        }
        
        .heading {
            font-size: 17px;
            text-transform: uppercase;
            margin-bottom: 5px;
            letter-spacing: 0;
            font-family: Georgia;
            line-height: 32px;
            vertical-align: baseline;
            letter-spacing: 0.35px;
            word-spacing: 0px;
            font-weight: 300;
            color: #002663;
            font-style: normal;
            font-variant: normal;
            text-transform: none;
            text-decoration: none;
            text-align: center;
            text-indent: 0px;
        }
        
        .info {
            font-size: 14px;
            color: #969696;
            margin-bottom: 10px;
        }
        
        .style {
            font-size: 16px;
            margin-bottom: 20px;
        }
        
        .old-price {
            color: #f00;
            text-decoration: line-through;
        }
        
        .product-rating {
            margin-top: 25px;
        }
        
        i.fa-star {
            color: #aaa;
            display: inline-block;
        }
        
        i.fa-star.rating {
            color: #61799a;
        }
        
        .hidden {
            display: none;
        }
        
        .j-desc-more {
            color: #546e98;
            background: #ffffff;
        }
        
        .j-desc-less {
            color: #546e98;
            background: #ffffff;
        }
        
        .star-ratings {
            unicode-bidi: bidi-override;
            color: #c5c5c5;
            font-size: 25px;
            height: 20px;
            width: 200px;
            text-align: center;
            margin: 0em auto;
            position: relative;
            padding-bottom: 10px;
        }
        
        .star-ratings .star-ratings-top {
            color: #607999;
            padding: 0;
            position: absolute;
            z-index: 1;
            display: block;
            left: 0px;
            text-align: center;
            overflow: hidden;
        }
        
        .star-ratings .star-ratings-bottom {
            z-index: 0;
            text-align: center;
        }
   
        

    </style>
</head>

<body id="page-top">

    <div id="preloader">
        <div class="page-loader" id="page-loader">
            <div class="page-loader-body">
                <svg width="40" height="40" viewbox="0 0 40 40">
    <polygon class="rect" points="0 0 0 40 40 40 40 0"></polygon>
    </svg>
            </div>
        </div>
    </div>

    <div class="topbar1">
        <div class="container" style="font-family:Segoe UI;">
            <div class="row">
                <div class="bar-phonee">
                    <i class="fa fa-volume-control-phone"></i> <span style="font-family:Georgia; text-transform:Uppercase;"><span 
    >Call</span> Us :</span> <strong style="font-family:Abel-Regular; text-decoration: none;letter-spacing:
    1px;font-size: 16px; font-weight: 500;
    text-align:left; line-height:24px; letter-spacing:1px;font-style:
    normal;font-variant:normal;text-transform:none;">0907 030 6962</strong>
                </div>
                <div class="bar-mail1">
                    <i class="fa fa-envelope"></i> <span style="font-family:Abel-Regular; text-decoration: none;letter-spacing:
    1px;font-size: 16px; font-weight: 500;
    text-align:left; line-height:24px; letter-spacing:1px;font-style:
    normal;font-variant:normal;text-transform:none;">Mail Us :</span> <strong style="font-family:Abel-Regular; text-decoration: none;letter-spacing:
    1px;font-size: 16px; font-weight: 500;
    text-align:left; line-height:24px; letter-spacing:1px;font-style:
    normal;font-variant:normal;text-transform:none;">info@alcanah.com</strong>
                </div>
                <div id="clockDisplay" style="font-family:Abel-Regular; text-decoration: none;letter-spacing:
    1px;font-size: 16px; font-weight: 500;
    text-align:left; line-height:24px; letter-spacing:1px;font-style:
    normal;font-variant:normal;text-transform:none;" class="bar-mail1">
                </div>
                <div class="header-social1">
                    <a class="facebook" href="https://web.facebook.com/zee.blacksoap/" title="facebook" target="_blank" rel="nofollow"><i class="fa fa-facebook"></i>  </a>
                    <a class="tweets" href="https://twitter.com/ZeeBlackSoap" title="twitter" target="_blank" rel="nofollow"><i class="fa fa-twitter"></i>  </a>
                    <a class="linkedin" href="https://twitter.com/AlcanahLimited" title="linkedin" target="_blank" rel="nofollow"><i class="fa fa-linkedin"></i>  </a>
                    <a class="instagram" href="https://www.instagram.com/zee.blacksoap/" title="linkedin" target="_blank" rel="nofollow"><i class="fa fa-instagram"></i>  </a>
                </div>
            </div>
        </div>
    </div>
     <nav class="navbar navbar-default navbar-sticky bootsnav fixed-top">
        <div class="container">
            <div class="row">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
  <i class="fa fa-bars"></i>
                </button>
                    <a class="navbar-brand logo" href="index.html"><img src="images/zeelogo.jpg" /></a>
                </div>
                <div class="collapse navbar-collapse" id="navbar-menu">
                    <ul class="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
    <li><a style="font-family:Abel-Regular; text-decoration: none;letter-spacing:
  1px;font-size: 16px; font-weight: 500;
  text-align:left; line-height:24px; letter-spacing:1px;font-style:
  normal;font-variant:normal;text-transform:none; top: 12px;" href="about.html">Learn About us</a></li>
     <li class="nav-item dropdown">
      <a style="font-family:Abel-Regular; text-decoration: none;letter-spacing:
      1px;font-size: 16px; font-weight: 500;
      text-align:left; line-height:24px; letter-spacing:1px;font-style:
      normal;font-variant:normal;text-transform:none; top: 13px;"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Products</a>
       <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          
          <li class="dropdown-submenu"><a  style="color:#000; text-align:center; font-family: Georgia; font-size: 16px;" class="dropdown-item dropdown-toggle">Washing and Bathing</a>
            <ul class="dropdown-menu">
              <li><a style="color:#000; font-weight:200; text-align:center; font-family: Georgia; font-size: 16px;" class="dropdown-header" class="dropdown-item" href="african-black-soap.html">African Black Soap</a></li>
              <li><a style="color:#000; text-align:center; font-family: Georgia; font-size: 16px;" class="dropdown-header" class="dropdown-item" href="soap-with-natural-ingredients.html">Soap With Natural Ingredients</a></li>
              <li><a style="color:#000; text-align:center; font-family: Georgia; font-size: 16px;" class="dropdown-header" class="dropdown-item" href="beauty-bar.html">Beauty Soap</a></li>
              <li><a style="color:#000; text-align:center; font-family: Georgia; font-size: 16px;" class="dropdown-header" class="dropdown-item" href="antibacterial-soap.html">Antibacterial Soap</a></li>
            </ul>

          </li>
          <li><a style="color:#000; text-align:center; font-family: Georgia; font-size: 16px;" class="dropdown-item" href="skin-care.html">Body care</a></li>
        </ul>

    </li>
    <li><a style="font-family:Abel-Regular; text-decoration: none;letter-spacing: 1px;font-size: 16px; font-weight: 500; text-align:left; line-height:24px; letter-spacing:1px;font-style: normal;font-variant:normal;text-transform:none; top: 13px;" href="ingredients.html">Ingredients</a></li>

      <li><a style="font-family:Abel-Regular; text-decoration: none;letter-spacing: 1px;font-size: 16px; font-weight: 500;text-align:left; line-height:24px;letter-spacing:1px;font-style:normal;font-variant:normal;text-transform:none; top: 13px;" href="skincare-tips.html">Skincare Tips</a></li>
      
      <li><a style="font-family:Abel-Regular; text-decoration: none;letter-spacing: 1px;font-size: 16px; font-weight: 500;
        text-align:left; line-height:24px; letter-spacing:1px;font-style:normal;font-variant:normal;text-transform:none; top: 13px;"
         href="shops.html">Distributors</a>
       </li>

      <li><a style="font-family:Abel-Regular; text-decoration: none;letter-spacing: 1px;font-size: 16px; font-weight: 500;
        text-align:left; line-height:24px; letter-spacing:1px;font-style:normal; font-variant:normal;text-transform:none; top: 13px;" href="faq.html">Faq</a>
      </li>

      <li><a style="font-family:Abel-Regular; text-decoration: none;letter-spacing: 1px;font-size: 16px; font-weight: 500;
        text-align:left; line-height:24px; letter-spacing:1px;font-style:normal;font-variant:normal;text-transform:none; top: 13px;" href="contact.php">Contact us</a>
      </li>

      </ul>
      </div>
      </div>
      </div>
    </nav>



    <!-- Breadcrumbs-->
     <section class="breadcrumbs-custom bg-image bg-image-dark" style="background-image: url(images/testi-bg.png);">
        <div class="container">
          <h1 class="breadcrumbs-custom__title">Contact us</h1>
          <ul class="breadcrumbs-custom__path">
            <li><a href="index.html">Home</a></li>
            <li class="active">Contact us</li>
          </ul>
        </div>
      </section><br/><br/>
 <!-- contact -->
 <div class="jumbotron jumbotron-fluid" id="contact" style="background-image: url(images/contact-bk.jpg);">
        <div class="container my-5">
            <div class="row justify-content-between">
                <div class="col-md-6 text-white">
                    <h2 style="font-family:Abel-Regular; font-size:20px; color:#ffffff;" class="font-weight-bold">Contact Us</h2>
                    <p style="font-family:Georgia; font-size:18px; color:#ffffff;" class="my-4">
                        Want to know more? Contact us online, through our careline or write to us.
                        <br>Monday - Friday :8am - 5pm
                    </p>
                    <ul style="font-family:Georgia; font-size:18px; color:#ffffff;" class="list-unstyled">
                        <li >Email : info@alcanah.com</li>
                        <li>Phone : 0907 030 6962</li>
                        <li>Address : Plot 5, Block K, Oluyole Industrial Estate, Ibadan, Oyo State</li>
                    </ul>
                </div>
                <div class="col-md-6">
                <?php if($msg != ''): ?>
                  <div class="alert <?php echo $msgClass; ?>"><?php echo $msg; ?></div>
                  <?php endif; ?>
                    <form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>">
                        <div class="row">
                            <div class="form-group col-md-6">
                                <label for="fname">Your Name</label>
                                <input type="text" id="fname" name="name" class="form-control" 
                                 value="<?php echo isset($_POST['name']) ? $name : ''; ?>">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="email">Your Email</label>
                                <input type="text" name="email" class="form-control" id="email" 
                                value="<?php echo isset($_POST['email']) ? $email : ''; ?>">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="message">Message</label>
                            <textarea name="message" class="form-control" id="message" rows="3">
                            <?php echo isset($_POST['message']) ? $message : ''; ?>
                            </textarea>
                        </div>
                        <div class="form-group">
                        <button value="Send Message" name="submit" type="submit" class="btn font-weight-bold atlas-cta atlas-cta-wide cta-green my-3">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

   
    <footer class="footer">
        <div class="footer-body">
            <div class="container">
                <div class="row">
                    <div class="col-md-3">
                        <div class="footer-section">
                            <h4 class="footer-section-title">About us</h4>
                            <div class="footer-section-body">
                                <p style="font-family:Abel-Regular; text-decoration: none;letter-spacing:
    1px;font-size: 18px; font-weight: 500;
    text-align:left; line-height:24px; letter-spacing:1px;font-style:
    normal;font-variant:normal;text-transform:none;">In your constant pursuit of beauty and style, Alcanah will help you bring your visions to reality with help of natural ingredients from nature..</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="footer-section">
                            <h4 class="footer-section-title">Quick Links</h4>
                            <div class="footer-section-body">
                                <ul class="list-links" style="font-family:Abel-Regular; text-decoration: none;letter-spacing:
    1px;font-size: 16px; font-weight: 500;
    text-align:left; line-height:24px; letter-spacing:1px;font-style:
    normal;font-variant:normal;text-transform:none;">
                                    <li>
                                        <a href="index.html">Home</a>
                                    </li>
                                    <li>
                                        <a href="about.html">About Us</a>
                                    </li>
                                    <li>
                                        <a href="ingredients.html">Ingredients</a>
                                    </li>
                                    <li>
                                        <a href="shops.html">Distributors</a>
                                    </li>
                                    <li>
                                        <a href="contact.php">Contact Us</a>
                                    </li>
                                    <li>
                                        <a href="skin-care.html">Skincare</a>
                                    </li>
                                    <li>
                                        <a href="skincare-tips.html">SkinCare Tips</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="footer-section">
                            <h4 class="footer-section-title">More</h4>

                            <div class="footer-section-body">
                                <ul class="list-links" style="font-family:Abel-Regular; text-decoration: none;letter-spacing:
     1px;font-size: 16px; font-weight: 500;
    text-align:left; line-height:24px; letter-spacing:1px;font-style:
    normal;font-variant:normal;text-transform:none;">
                                    <li>
                                        <a href="faq.html">FAQ</a>
                                    </li>
                                    <li>
                                        <a href="privacy.html">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="career.html">Career</a>
                                    </li>
                                    <li>
                                        <a href="terms-and-conditions.html">Terms of use</a>
                                    </li>
                                    <li>
                                        <a href="sitemap.html">Site map</a>
                                    </li>
                                    <li>
                                        <a href="commitments.html">Commitments</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="footer-section">
                            <h4 class="footer-section-title">Contact Us</h4>
                            <div class="footer-section-body">
                                <p style="font-family:Abel-Regular; text-decoration: none;letter-spacing:
                                    1px;font-size: 16px; font-weight: 500;
                                    text-align:left; line-height:24px; letter-spacing:1px;font-style:
                                    normal;font-variant:normal;text-transform:none;"><b>Address:</b> Plot 5,Block K,Oluyole Industrial Estate, Ibadan,Oyo State</p>

                                <div class="footer-contacts">
                                    <p style="font-family:Abel-Regular; text-decoration: none;letter-spacing:
                                        1px;font-size: 16px; font-weight: 500;
                                        text-align:left; line-height:24px; letter-spacing:1px;font-style:
                                        normal;font-variant:normal;text-transform:none;">
                                        <b>
                                            <i class="fa fa-phone"></i> Phone:
                                        </b> 0907 030 6962
                                    </p>

                                    <p style="font-family:Abel-Regular; text-decoration: none;letter-spacing:
                                        1px;font-size: 16px; font-weight: 500;
                                        text-align:left; line-height:24px; letter-spacing:1px;font-style:
                                        normal;font-variant:normal;text-transform:none;">
                                        <b>
                                            <i class="fa fa-envelope-o"></i> Email:
                                        </b> info@alcanah.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bwt-footer-copyright">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 copyright" style="font-family:Abel-Regular; text-decoration: none;letter-spacing:
        1px;font-size: 16px; font-weight: 500;
        text-align:left; line-height:24px; letter-spacing:1px;font-style:
        normal;font-variant:normal;text-transform:none;">
                        <div class="left-text">Copyright &copy; Alcanah Ltd 2018. All Rights Reserved</div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <script>
        jQuery(document).ready(function($) {

            $(window).load(function() {
                $('#preloader').fadeOut('slow', function() {
                    $(this).remove();
                });
            });

        });
    </script>


    <script src="jss/jquery.min.js"></script>
    <script src="jss/bootstrap.min.js"></script>
    <script src="js/showmore.js"></script>
    <script src="js/fiddlereadmore.js"></script>
    <script src="jss/jquery.waypoints.min.js"></script>
    <script src="js/star-rating.js"></script>
    <script src="jss/jquery.lightbox.min.js"></script>
    <script src="jss/jquery.countTo.js"></script>
    <!-- Theme JavaScript -->
    <script src="jss/script.js"></script>
    <script src="jss/preloader.js"></script>
    <script src="js/date.js"></script>
    <script type="text/javascript" src="jsss/jquery.flexisel.js"></script>
    <script type="text/javascript" src="jsss/easing.js"></script>

     <script type="text/javascript">

    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');


    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
      $('.dropdown-submenu .show').removeClass("show");
    });
    return false;
    });

    </script>


    <!-- OFFLINE Alcanah LIVE CHAT API NOT CONNECTED ONLLINE NOW-->
    <script type="text/javascript">
        var Tawk_API = Tawk_API || {},
            Tawk_LoadStart = new Date();
        (function() {
            var s1 = document.createElement("script"),
                s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/5a8535a04b401e45400cf237/default';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
        })();
    </script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
</body>

</html>