/**
 * +--------------------------------------------------------------------+
 * | This HTML_CodeSniffer file is Copyright (c)                        |
 * | Squiz Pty Ltd (ABN 77 084 670 600)                                 |
 * +--------------------------------------------------------------------+
 * | IMPORTANT: Your use of this Software is subject to the terms of    |
 * | the Licence provided in the file licence.txt. If you cannot find   |
 * | this file please contact Squiz (www.squiz.com.au) so we may        |
 * | provide you a copy.                                                |
 * +--------------------------------------------------------------------+
 *
 */

_global.HTMLCS_WCAG2AAA_Sniffs_Principle2_Guideline2_2_2_2_2 = {
  /**
   * Determines the elements to register for processing.
   *
   * Each element of the returned array can either be an element name, or "_top"
   * which is the top element of the tested code.
   *
   * @returns {Array} The list of elements.
   */
  register: () => ["_top", "blink"],

  /**
   * Process the registered element.
   *
   * @param {DOMNode} element The element registered.
   * @param {DOMNode} top     The top element of the tested code.
   */
  process: function (element, top) {
    if (element === top) {
      HTMLCS.addMessage(
        HTMLCS.NOTICE,
        element,
        _global.HTMLCS.getTranslation("2_2_2_SCR33,SCR22,G187,G152,G186,G191"),
        "SCR33,SCR22,G187,G152,G186,G191"
      );

      for (const ele of HTMLCS.util.getAllElements(top, "*")) {
        var computedStyle = HTMLCS.util.style(ele);

        if (computedStyle) {
          if (/blink/.test(computedStyle["text-decoration"]) === true) {
            HTMLCS.addMessage(
              HTMLCS.WARNING,
              ele,
              _global.HTMLCS.getTranslation("2_2_2_F4"),
              "F4"
            );
          }
        }
      }
    } else if (element.nodeName === "BLINK") {
      HTMLCS.addMessage(
        HTMLCS.ERROR,
        element,
        _global.HTMLCS.getTranslation("2_2_2_F47"),
        "F47"
      );
    }
  },
};
