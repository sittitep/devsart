module Jekyll::CustomFilter
  def proxy_image_url(input, width, height, type="auto")
    if ENV["IMGPROXY"]
      "#{ENV['IMGPROXY_URL']}/rs:#{type}:#{width}:#{height}:0/q:100/g:sm/plain/#{absolute_url(input)}"
    else
      input
    end
  end
end

Liquid::Template.register_filter(Jekyll::CustomFilter)
