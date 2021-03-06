/*
 * Zula Framework Module
 *
 * @patches submit all patches to patches@tangocms.org
 *
 * @author Alex Cartwright
 * @copyright Copyright (C) 2008, 2009, 2010 Alex Cartwright
 * @license http://www.gnu.org/licenses/old-licenses/gpl-2.0.html GNU/GPL 2
 * @package TangoCMS_Module_Manager
 */

/**
 * Filters out modules when a user types in the box
 */
$(document).ready( function() {
	$("div.jsSearchBox").show();
	$("#modulemanagerFilter").focus().keyup( function(event) {
		var filter = RegExp.escape( $("#modulemanagerFilter").val() );
		/**
		 * Go through each module and see if it matches (case insensitive
		 */
		$("ol.modulemanagerItem li").each( function() {
			var module = jQuery.trim( $(this).find("p a.title").text() );
			var title_regex = new RegExp( filter, "gi");
			if ( module.match( title_regex ) ) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});

		var visible_modules_total = 0;
		var last_visible_module;
		$("div.modulemanagerCategory").each( function() {
			$(this).show();
			var visible_modules = $(this).find("li:visible");
			if ( visible_modules.length > 0 ) {
				last_visible_module = visible_modules.eq(0);
			} else {
				$(this).hide();
			}
			visible_modules_total += visible_modules.length;
		});

		if ( visible_modules_total == 1 && event.keyCode == 13 ) {
			if ( event.shiftKey ) {
				location.href = last_visible_module.find("p a.modulemanagerUrlPermission").attr("href");
			} else {
				location.href = last_visible_module.find("p a.title").attr("href");
			}
		}

		/**
		 * Toggle Visual Feedback in the input box
		 */
		if ( visible_modules_total > 0 ) {
			$("#modulemanagerFilter").removeClass("error");
		} else if ( $("#modulemanagerFilter").hasClass("error") == false ) {
			$("#modulemanagerFilter").addClass("error");
		}
	});
});