module ApiHelper
  def format_date(date)
    date.nil? ? 'n/a' : date.strftime('%v')
  end
end