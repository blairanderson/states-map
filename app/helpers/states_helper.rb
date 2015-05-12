module StatesHelper
  def submit_correction_path
    "/correction"
  end

  def legal_status(status=nil)
    status.present? ? t(status) : t('none')
  end

  def state_title(state=nil)
    if state
      "Is Recreational Weed Legal in #{state.name}?".titleize
    else
      "Is Recreational Weed Legal?"
    end
  end

  def state_header(state=nil)
    if state
      [
        content_tag(:div, "Is Recreational Weed Legal in".titleize, id: "title-text"),
        content_tag(:div, " #{state.name}?".titleize, id: "title-state")
      ].join.html_safe
    else
      content_tag(:span, "Is Recreational Weed Legal?", id: 'title-text')
    end
  end
end
