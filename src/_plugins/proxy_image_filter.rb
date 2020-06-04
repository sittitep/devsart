require 'uri'

module Jekyll::CustomFilter
  def proxy_image_url(input, width, height, type="auto")
    if ENV["IMGPROXY"]
      input = URI.escape(input, Regexp.new("[^#{URI::PATTERN::UNRESERVED}]"))
      "#{ENV['IMGPROXY_URL']}/rs:#{type}:#{width}:#{height}:0/q:100/g:sm/plain/#{absolute_url(input)}"
    else
      input
    end
  end
end

Liquid::Template.register_filter(Jekyll::CustomFilter)
