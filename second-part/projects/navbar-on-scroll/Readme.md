# Navbar on Scroll:

## Description:

If user scrolls a window height which is greater than the navbar height, then the navbar background-color becomes white and fixes on top. If user comes back again to the top, the navbar background becomes as it was at first (when the user didn't scroll the height greter then the navbar's height)

## My Learnings from this project :

1.  Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
2.  window.ScrollY property gives the height of the browser window user scrolled totally.

3.  Give "scroll-behaviour:smooth" css property to all of the elements used to give a smooth effect if user clicks "back-to-top" button or a menu-link on the navbar.

4.  Use the "overflow-x:hidden" css property to prevent horizontal scroll bar.
