// TODO: inauth.js
				var inauth = {};

				inauth.keep_logged_in_days = 15 * 365;
				inauth.cookie_name = "InAuth-bitdo";
				//inauth.cookie_domain = '.bit.do';
				inauth.cookie_domain = '.bit.do';
				// TODO:
				inauth.init = function() {
				}

				// TODO: use inauth.app_id
				//inauth.app_id = 'bit.do';
				inauth.app_id = 'bit.do';
				inauth.getcookie = function(cookie_name) {

				  if (!cookie_name) {
				    cookie_name = inauth.cookie_name; // will use default cookie name
				  }

				  var cookie_nameEQ = cookie_name + "=";
				  var ca = document.cookie.split(';');
				  for(var i=0;i < ca.length;i++) {
				      var c = ca[i];
				      while (c.charAt(0)==' ') c = c.substring(1,c.length);
				      if (c.indexOf(cookie_nameEQ) == 0) return c.substring(cookie_nameEQ.length,c.length);
				  }

				  return null;
				}


				inauth.logout = function (redirect_url) {



				  inauth.delcookie(inauth.cookie_name);

				  if (redirect_url) {
				    document.location.href = redirect_url;

				  } else {

				    inauth.logged_user_username = '';
				    hide_user_info();
				    alert_message('info', 'You\'re logged out. Please <a href="javascript:;" onClick="login_show()">login</a> again to save and manage your links.');
				  }
				  return false;
				}


				inauth.setcookie = function(params) {

				  var name   = params.name;
				  var value  = params.value;
				  var days   = params.days;
				  var domain = params.domain;

				  var expires_str;
				  if (days) {
				    var date = new Date();
				    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				    expires_str = "; expires=" + date.toGMTString();
				  } else {
				    expires_str = "";
				  }

				  var domain_str;
				  if (domain) {
				    domain_str = "; DOMAIN=" + domain
				  }

				  var set_cookie_value = name + "=" + value + expires_str + domain_str + "; path=/";
				  document.cookie = set_cookie_value;

				  if (inauth.debug) {
				    console.log("inauth.setcookie: "+set_cookie_value);
				  }

				  window.localStorage.setItem(name, value); // Sometimes cookies are not wokring (Android app)

				}

				inauth.delcookie = function (cookie_name) {
				  inauth.setcookie({
				     'name': cookie_name,
				    'value': "",
				   'domain': inauth.cookie_domain,
				     'days': -1
				  });
				}

				inauth.create_or_get_permasession = function() {

				  // Retrieve or set permanent session
				  var permasession_value = inauth.getcookie('permasession');
				  if (!permasession_value) {
				    var days = 15 * 365;
				    var time = parseInt ((new Date().getTime()) / 1000);
				    var rnd_str = Math.random().toString(36).slice(-10);
				    permasession_value = time+'|'+rnd_str;

				    inauth.setcookie({
				      'name': 'permasession',
				     'value': permasession_value,
				      'days': days
				    });
				  }
				  inauth.permasession_value = permasession_value;
				  return permasession_value;

				}

				inauth.init();