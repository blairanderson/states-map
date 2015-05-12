class State
  DB = 'db/states.json'

  def self.all
    list.map { |s| OpenStruct.new(s) }
  end

  def self.find(abbr_or_name)
    state = self.list.find do |state|
      state['slug'].downcase == abbr_or_name.downcase
    end
    state ? OpenStruct.new(state) : false
  end

  def self.list
    # add extra variables here
    JSON.parse(File.read(File.join(Rails.root, DB))).map do |state|
      state.merge({"slug" => state["name"].parameterize})
    end
  end
end
